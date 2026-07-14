#!/usr/bin/env node

import { lstatSync, readdirSync, readFileSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputRoot = resolve(root, 'out');
const policy = JSON.parse(
  readFileSync(resolve(root, 'src/config/security-policy.json'), 'utf8'),
);
const allowedOrigins = new Set(policy.allowedExternalOrigins);
const failures = [];

function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

function outputPath(file) {
  return relative(outputRoot, file).replaceAll('\\', '/');
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = resolve(directory, entry.name);
    const stats = lstatSync(absolute);
    if (stats.isSymbolicLink()) {
      fail(outputPath(absolute), 'symbolic links are not permitted in the deployment artifact');
    } else if (entry.isDirectory()) {
      files.push(...walk(absolute));
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }
  return files;
}

let outputFiles;
try {
  outputFiles = walk(outputRoot);
} catch (error) {
  console.error(`Static export check could not read out/: ${error.message}`);
  process.exit(1);
}

const sensitiveArtifactNames = [
  /(^|\/)\.env($|\.)/i,
  /(^|\/)\.git(?:\/|$)/i,
  /(^|\/)(?:package-lock\.json|package\.json|tsconfig\.json)$/i,
  /\.(?:db|jks|key|keystore|map|p12|pfx|pem|sqlite|ts|tsx)$/i,
  /(^|\/)(?:credentials?|secrets?)(?:\.|$)/i,
];
const artifactSecretPatterns = [
  ['private key', /-----BEGIN (?:DSA |EC |OPENSSH |PGP |RSA )?PRIVATE KEY-----/],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9_]{20,255}|github_pat_[A-Za-z0-9_]{22,255})\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['Slack token', /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/],
  ['Stripe secret key', /\b(?:rk|sk)_(?:live|test)_[0-9A-Za-z]{16,}\b/],
];
const artifactTextExtensions = new Set([
  '',
  '.css',
  '.html',
  '.js',
  '.json',
  '.svg',
  '.txt',
]);

for (const file of outputFiles) {
  const normalized = outputPath(file);
  if (sensitiveArtifactNames.some((pattern) => pattern.test(normalized))) {
    fail(normalized, 'sensitive or development-only file is present in the deployment artifact');
  }

  if (artifactTextExtensions.has(extname(file).toLowerCase())) {
    const contents = readFileSync(file, 'utf8');
    for (const [label, pattern] of artifactSecretPatterns) {
      if (pattern.test(contents)) {
        fail(normalized, `possible ${label} leaked into deployment (value intentionally redacted)`);
      }
    }
  }
}

function decodeAttribute(value) {
  return value
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&');
}

function attribute(tag, name) {
  const match = tag.match(
    new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'),
  );
  return match ? decodeAttribute(match[1] ?? match[2]) : undefined;
}

const htmlFiles = outputFiles.filter((file) => extname(file).toLowerCase() === '.html');

for (const file of htmlFiles) {
  const normalized = outputPath(file);
  const html = readFileSync(file, 'utf8');
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const cspTag = metaTags.find(
    (tag) => attribute(tag, 'http-equiv')?.toLowerCase() === 'content-security-policy',
  );
  const referrerTag = metaTags.find(
    (tag) => attribute(tag, 'name')?.toLowerCase() === 'referrer',
  );

  if (!cspTag || attribute(cspTag, 'content') !== policy.contentSecurityPolicy) {
    fail(normalized, 'missing or unexpected Content Security Policy meta tag');
  }
  if (!referrerTag || attribute(referrerTag, 'content') !== policy.referrerPolicy) {
    fail(normalized, 'missing or unexpected referrer policy meta tag');
  }
  const firstResourceTag = html.search(/<(?:script|link)\b/i);
  if (
    !cspTag ||
    !referrerTag ||
    html.indexOf(cspTag) > firstResourceTag ||
    html.indexOf(referrerTag) > firstResourceTag
  ) {
    fail(normalized, 'security meta tags must precede every resource load');
  }
  if (metaTags.some((tag) => attribute(tag, 'http-equiv')?.toLowerCase() === 'refresh')) {
    fail(normalized, 'meta refresh redirects are prohibited');
  }

  if (/<(?:base|embed|iframe|object)\b/i.test(html)) {
    fail(normalized, 'base, embed, iframe, and object elements are prohibited');
  }
  if (/\son[a-z]+\s*=/i.test(html)) {
    fail(normalized, 'inline event handler attribute is prohibited');
  }
  if (/http:\/\//i.test(html)) {
    fail(normalized, 'mixed-content HTTP URL is prohibited');
  }

  const tags = html.match(/<(?:a|form|img|link|script)\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const tagName = tag.match(/^<([a-z]+)/i)?.[1].toLowerCase();
    const target = attribute(tag, 'target');
    const rel = new Set((attribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/));

    if (target?.toLowerCase() === '_blank' && (!rel.has('noopener') || !rel.has('noreferrer'))) {
      fail(normalized, 'target="_blank" link is missing rel="noopener noreferrer"');
    }

    for (const name of ['action', 'href', 'src']) {
      const value = attribute(tag, name);
      if (!value || value.startsWith('#')) continue;

      if (/^(?:javascript:|data:text\/html|\/\/)/i.test(value)) {
        fail(normalized, `unsafe ${name} URL: ${value.slice(0, 40)}`);
        continue;
      }

      if (/^https?:/i.test(value)) {
        let parsed;
        try {
          parsed = new URL(value);
        } catch {
          fail(normalized, `invalid absolute ${name} URL`);
          continue;
        }
        if (parsed.protocol !== 'https:' || !allowedOrigins.has(parsed.origin)) {
          fail(normalized, `non-allowlisted external origin: ${parsed.origin}`);
        }
      }
    }

    if (tagName === 'script') {
      const src = attribute(tag, 'src');
      if (src && !src.startsWith('/_next/')) {
        fail(normalized, `script source must be a same-origin Next.js asset: ${src}`);
      }
    }
  }
}

if (htmlFiles.length === 0) {
  fail('out/', 'no HTML files were generated');
}

if (failures.length > 0) {
  console.error(`Static export security check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Static export security check passed (${outputFiles.length} files, ${htmlFiles.length} HTML pages).`,
);

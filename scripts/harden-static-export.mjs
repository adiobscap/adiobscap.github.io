#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputRoot = resolve(root, 'out');
const policy = JSON.parse(
  readFileSync(resolve(root, 'src/config/security-policy.json'), 'utf8'),
);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
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

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const earlySecurityTags =
  `<meta http-equiv="Content-Security-Policy" content="${escapeAttribute(policy.contentSecurityPolicy)}"/>` +
  `<meta name="referrer" content="${escapeAttribute(policy.referrerPolicy)}"/>`;
const htmlFiles = walk(outputRoot).filter(
  (file) => extname(file).toLowerCase() === '.html',
);

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const policyTags = metaTags.filter((tag) => {
    const httpEquiv = attribute(tag, 'http-equiv')?.toLowerCase();
    const name = attribute(tag, 'name')?.toLowerCase();
    return httpEquiv === 'content-security-policy' || name === 'referrer';
  });
  let hardened = html;

  for (const tag of policyTags) hardened = hardened.replace(tag, '');
  if (!hardened.includes('<head>')) {
    throw new Error(`Cannot find <head> in generated file ${file}`);
  }

  hardened = hardened.replace('<head>', `<head>${earlySecurityTags}`);
  writeFileSync(file, hardened);
}

console.log(`Hardened ${htmlFiles.length} generated HTML pages.`);

#!/usr/bin/env node

import { lstatSync, readdirSync, readFileSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const policyPath = resolve(root, 'src/config/security-policy.json');
const policy = JSON.parse(readFileSync(policyPath, 'utf8'));
const failures = [];

function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

function repoPath(file) {
  return relative(root, file).replaceAll('\\', '/');
}

function readRepositoryFiles(directory = root) {
  const files = [];
  const excludedDirectories = new Set(['.git', '.next', 'node_modules', 'out']);

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;

    const absolute = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...readRepositoryFiles(absolute));
    } else {
      files.push(repoPath(absolute));
    }
  }

  return files;
}

const trackedFiles = readRepositoryFiles();
const textExtensions = new Set([
  '',
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml',
]);
const forbiddenTrackedNames = [
  /(^|\/)\.env($|\.)/i,
  /(^|\/)(?:credentials?|secrets?)(?:\.|$)/i,
  /\.(?:jks|key|keystore|p12|pfx|pem)$/i,
  /(^|\/)id_(?:dsa|ecdsa|ed25519|rsa)(?:\.pub)?$/i,
];
const secretPatterns = [
  ['private key', /-----BEGIN (?:DSA |EC |OPENSSH |PGP |RSA )?PRIVATE KEY-----/g],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9_]{20,255}|github_pat_[A-Za-z0-9_]{22,255})\b/g],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/g],
  ['Slack token', /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/g],
  ['Stripe secret key', /\b(?:rk|sk)_(?:live|test)_[0-9A-Za-z]{16,}\b/g],
  [
    'credential-bearing URL',
    /\b(?:mariadb|mongodb(?:\+srv)?|mysql|postgres(?:ql)?|redis):\/\/[^\s:/]+:[^\s@/]+@/gi,
  ],
  [
    'hard-coded generic credential',
    /\b(?:api[_-]?key|auth[_-]?token|password|passwd|secret|access[_-]?token)\s*[=:]\s*["']?([A-Za-z0-9+/_=-]{20,})["']?/gi,
  ],
];

for (const tracked of trackedFiles) {
  const absolute = resolve(root, tracked);
  const normalized = repoPath(absolute);

  if (normalized.startsWith('../')) {
    fail(tracked, 'tracked path resolves outside the repository');
    continue;
  }

  const stats = lstatSync(absolute);
  if (stats.isSymbolicLink()) {
    fail(normalized, 'tracked symbolic links are not permitted');
    continue;
  }

  if (forbiddenTrackedNames.some((pattern) => pattern.test(normalized))) {
    fail(normalized, 'sensitive filename must not be tracked');
  }

  if (!stats.isFile() || !textExtensions.has(extname(normalized).toLowerCase())) {
    continue;
  }

  const contents = readFileSync(absolute, 'utf8');
  for (const [label, pattern] of secretPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(contents)) {
      fail(normalized, `possible ${label} detected (value intentionally redacted)`);
    }
  }
}

const codeExtensions = new Set(['.html', '.js', '.jsx', '.mjs', '.ts', '.tsx']);
const riskySinks = [
  ['dynamic code execution', /\beval\s*\(|\bnew\s+Function\s*\(/],
  ['DOM HTML injection', /\.\s*(?:innerHTML|outerHTML)\s*=|\binsertAdjacentHTML\s*\(/],
  ['document stream injection', /\bdocument\s*\.\s*(?:write|writeln)\s*\(/],
  ['javascript URL', /["'`]\s*javascript\s*:/i],
];

for (const tracked of trackedFiles) {
  const extension = extname(tracked).toLowerCase();
  if (!codeExtensions.has(extension) || tracked === 'scripts/security-check.mjs') {
    continue;
  }

  const contents = readFileSync(resolve(root, tracked), 'utf8');
  for (const [label, pattern] of riskySinks) {
    if (pattern.test(contents)) {
      fail(tracked, `${label} is prohibited`);
    }
  }
}

const rawHtmlFiles = trackedFiles.filter((file) =>
  ['.jsx', '.tsx'].includes(extname(file).toLowerCase()),
);
const rawHtmlUses = rawHtmlFiles.flatMap((file) => {
  const contents = readFileSync(resolve(root, file), 'utf8');
  return contents.includes('dangerouslySetInnerHTML') ? [file] : [];
});
const expectedJsonLdFile = 'src/app/careers/[slug]/page.tsx';

if (rawHtmlUses.length !== 1 || rawHtmlUses[0] !== expectedJsonLdFile) {
  fail(
    'React HTML sinks',
    `only the escaped JSON-LD sink in ${expectedJsonLdFile} is permitted`,
  );
} else {
  const jsonLdSource = readFileSync(resolve(root, expectedJsonLdFile), 'utf8');
  if (
    !jsonLdSource.includes("JSON.stringify(buildJobPostingJsonLd") ||
    !jsonLdSource.includes(".replace(/</g, '\\\\u003c')") ||
    !jsonLdSource.includes('__html: jsonLd')
  ) {
    fail(expectedJsonLdFile, 'JSON-LD must be serialized and escape every less-than sign');
  }
}

const allowedOrigins = new Set(policy.allowedExternalOrigins);
for (const origin of allowedOrigins) {
  try {
    const parsed = new URL(origin);
    if (
      parsed.protocol !== 'https:' ||
      parsed.origin !== origin ||
      parsed.username ||
      parsed.password
    ) {
      fail(policyPath, `invalid allowed origin: ${origin}`);
    }
  } catch {
    fail(policyPath, `unparseable allowed origin: ${origin}`);
  }
}

for (const tracked of trackedFiles.filter((file) => file.startsWith('src/'))) {
  const extension = extname(tracked).toLowerCase();
  if (!textExtensions.has(extension)) continue;

  const contents = readFileSync(resolve(root, tracked), 'utf8');
  const urls = contents.match(/https?:\/\/[^\s"'`<>\\)]+/g) ?? [];
  for (const candidate of urls) {
    let parsed;
    try {
      parsed = new URL(candidate.replace(/[.,;:]$/, ''));
    } catch {
      fail(tracked, `invalid absolute URL: ${candidate}`);
      continue;
    }

    if (parsed.protocol !== 'https:') {
      fail(tracked, `insecure absolute URL: ${candidate}`);
    } else if (!allowedOrigins.has(parsed.origin)) {
      fail(tracked, `external origin is not allowlisted: ${parsed.origin}`);
    }
  }
}

const jobsPath = resolve(root, 'src/data/jobs.json');
const jobsData = JSON.parse(readFileSync(jobsPath, 'utf8'));
const seenSlugs = new Set();

for (const job of jobsData.jobs ?? []) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(job.slug ?? '')) {
    fail('src/data/jobs.json', `unsafe job slug: ${JSON.stringify(job.slug)}`);
  }
  if (seenSlugs.has(job.slug)) {
    fail('src/data/jobs.json', `duplicate job slug: ${job.slug}`);
  }
  seenSlugs.add(job.slug);

  try {
    const applyUrl = new URL(job.applyUrl);
    if (
      applyUrl.protocol !== 'https:' ||
      !allowedOrigins.has(applyUrl.origin) ||
      applyUrl.username ||
      applyUrl.password
    ) {
      fail('src/data/jobs.json', `unsafe application URL for ${job.slug}`);
    }
  } catch {
    fail('src/data/jobs.json', `invalid application URL for ${job.slug}`);
  }
}

const cspDirectives = new Map(
  policy.contentSecurityPolicy.split(';').map((directive) => {
    const [name, ...values] = directive.trim().split(/\s+/);
    return [name, values];
  }),
);
const requiredDirectives = [
  ['base-uri', "'none'"],
  ['default-src', "'self'"],
  ['form-action', "'none'"],
  ['object-src', "'none'"],
  ['script-src-attr', "'none'"],
  ['upgrade-insecure-requests', undefined],
];

for (const [directive, requiredValue] of requiredDirectives) {
  const values = cspDirectives.get(directive);
  if (!values || (requiredValue && !values.includes(requiredValue))) {
    fail('src/config/security-policy.json', `CSP is missing ${directive} ${requiredValue ?? ''}`.trim());
  }
}

const cspForbiddenTokens = ["'unsafe-eval'", '*', 'http:', 'https:'];
for (const token of cspForbiddenTokens) {
  if ([...cspDirectives.values()].some((values) => values.includes(token))) {
    fail('src/config/security-policy.json', `CSP contains forbidden token ${token}`);
  }
}

const workflowFiles = trackedFiles.filter(
  (file) => file.startsWith('.github/workflows/') && /\.ya?ml$/i.test(file),
);
const allowedActions = new Set([
  'actions/checkout',
  'actions/dependency-review-action',
  'actions/deploy-pages',
  'actions/setup-node',
  'actions/upload-pages-artifact',
  'github/codeql-action',
  'trufflesecurity/trufflehog',
]);

for (const workflow of workflowFiles) {
  const contents = readFileSync(resolve(root, workflow), 'utf8');
  const uses = [
    ...contents.matchAll(/^\s*(?:-\s+)?uses:\s*([^\s#]+)(?:\s+#.*)?$/gm),
  ];
  const checkoutCount = uses.filter((match) => match[1].startsWith('actions/checkout@')).length;
  const noCredentialCount = (contents.match(/persist-credentials:\s*false/g) ?? []).length;

  if (!/^permissions:\s*$/m.test(contents)) {
    fail(workflow, 'must declare least-privilege token permissions');
  }
  if (/permissions:\s*write-all|pull_request_target\s*:/m.test(contents)) {
    fail(workflow, 'write-all permissions and pull_request_target are prohibited');
  }
  if (/^\s*run:.*\$\{\{/m.test(contents)) {
    fail(workflow, 'event expressions must not be interpolated directly into shell commands');
  }
  if (/\b(?:curl|wget)\b[^\n|]*\|\s*(?:ba)?sh\b/.test(contents)) {
    fail(workflow, 'download-and-execute shell pipelines are prohibited');
  }
  for (const line of contents.match(/^\s*-?\s*run:\s*npm ci.*$/gm) ?? []) {
    if (!line.includes('--ignore-scripts')) {
      fail(workflow, 'npm ci must disable dependency lifecycle scripts');
    }
  }
  if (checkoutCount !== noCredentialCount) {
    fail(workflow, 'every checkout must set persist-credentials: false');
  }

  for (const match of uses) {
    const actionRef = match[1];
    const separator = actionRef.lastIndexOf('@');
    const action = actionRef.slice(0, separator);
    const revision = actionRef.slice(separator + 1);
    const actionRoot = action.split('/').slice(0, 2).join('/');

    if (!allowedActions.has(actionRoot)) {
      fail(workflow, `action is not allowlisted: ${action}`);
    }
    if (!/^[0-9a-f]{40}$/.test(revision)) {
      fail(workflow, `action must be pinned to a full commit SHA: ${actionRef}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Security source check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Security source check passed (${trackedFiles.length} repository files, ${workflowFiles.length} workflows).`,
);

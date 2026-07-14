# Security operations

This site is a static Next.js export deployed to GitHub Pages. It has no
server-side sessions, database, authentication endpoint, or user-submitted
form handler. The controls in this repository focus on the static content and
the software/deployment supply chain.

No automated check can guarantee that a breach will never occur. These checks
are intended to prevent common mistakes, reject known vulnerable changes, and
make suspicious changes visible before deployment.

## Checks run for changes

Run the same core checks locally with:

```sh
npm ci --ignore-scripts
npm run security:audit
npm run check
```

The checks enforce:

- ESLint and strict TypeScript validation.
- A full production and development dependency audit that rejects moderate,
  high, and critical advisories.
- High-confidence secret and private-key detection without printing detected
  values.
- No tracked secret files, private-key files, symbolic links, dynamic code
  execution, DOM HTML injection, insecure URLs, or unapproved outbound origins.
- HTTPS-only, allowlisted recruiting and regulatory links.
- Immutable commit-SHA pins, restricted permissions, and credential-free
  checkout for every GitHub Action.
- A successful static build with the expected Content Security Policy and
  referrer policy on every HTML page.
- No source maps, development manifests, source files, credentials, private
  keys, unsafe link protocols, inline event handlers, mixed content, or
  unapproved remote scripts in the deployment artifact.

CI adds three checks that are not fully reproduced by the local command:

- GitHub dependency review rejects newly introduced vulnerable packages and
  reports poor OpenSSF package health.
- TruffleHog scans changed commits (and the complete history on scheduled or
  manual runs) for verified or unverifiable credentials.
- CodeQL runs its extended JavaScript and TypeScript security query suite.

Dependabot checks npm packages and pinned GitHub Actions every week. Review and
merge its security updates promptly; never merge solely because the bot opened
the pull request.

## Required GitHub settings

Repository administrators must configure these controls because workflow files
cannot enable them:

1. Protect `main`: require a pull request, disallow force pushes and deletion,
   require all security/build checks, and dismiss stale approvals after new
   commits.
2. Require review for `.github/` workflow and ownership changes. CODEOWNERS
   identifies the current responsible accounts.
3. Enable the dependency graph, Dependabot alerts and security updates, secret
   scanning, and push protection. Restrict or require approval for push
   protection bypasses.
4. In Actions settings, allow only required actions and require actions to be
   pinned to a full commit SHA where the organization policy supports it.
5. Restrict the `github-pages` environment to `main` and keep its deployment
   approval/audit history enabled.
6. Enable HTTPS enforcement for the custom domain and monitor the domain and
   DNS account for unauthorized changes. Protect those accounts with phishing-
   resistant MFA and recovery controls.

## Hosting-edge headers

GitHub Pages does not support repository-defined custom HTTP response headers.
The site includes a CSP and referrer policy using HTML meta tags, but a meta CSP
cannot enforce `frame-ancestors` and does not replace all response headers.

If the domain is placed behind a trusted CDN or reverse proxy, configure and
continuously verify these response headers there:

```text
Content-Security-Policy: default-src 'self'; base-uri 'none'; child-src 'none'; connect-src 'self'; font-src 'self'; form-action 'none'; frame-ancestors 'none'; frame-src 'none'; img-src 'self' data:; manifest-src 'self'; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline'; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests; worker-src 'none'
Referrer-Policy: no-referrer
Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
```

Only add HSTS `preload` after confirming that every present and future subdomain
will remain HTTPS-only. Test the production headers after every CDN or DNS
change.

## Incident response

If a secret may have entered a commit, artifact, log, or pull request, revoke
and rotate it immediately. Removing it from the latest commit is not sufficient
because Git history and caches may retain it. Review GitHub security alerts and
workflow logs, invalidate affected sessions or deployment credentials, assess
access logs, and coordinate history cleanup only after containment.

For a suspected site or deployment compromise, disable the Pages deployment or
restore the last known-good artifact, preserve audit evidence, rotate affected
GitHub/DNS/CDN credentials, and review recent commits, workflow runs,
environment approvals, and DNS changes before re-enabling production.

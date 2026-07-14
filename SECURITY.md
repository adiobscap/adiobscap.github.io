# Security policy

## Reporting a vulnerability

Please report suspected vulnerabilities privately to
[admin@obsidiancapital.in](mailto:admin@obsidiancapital.in). Do not open a
public issue with exploit details, credentials, personal data, or other
sensitive information.

Include the affected URL or file, the impact, reproduction steps, and any
suggested remediation. We will acknowledge a report as soon as practical,
investigate it, and coordinate disclosure after a fix is available.

## Supported version

Only the current deployment from the `main` branch is supported. Historical
commits and local development snapshots do not receive security fixes.

## Security controls

Every proposed production change is expected to pass the repository's build,
lint, type, dependency, secret, static-export, and CodeQL checks. Operational
controls that must be enabled in GitHub and at the hosting edge are documented
in [docs/security.md](docs/security.md).

// lib/jobs.ts
//
// Typed access to the canonical jobs data file at src/data/jobs.json.
// This is the single source of truth for all careers content — the
// careers index page, the [slug] detail route, and the [slug]/apply
// route all read from here. Adding a new role is a pure JSON edit.

import jobsData from '@/data/jobs.json';

export type PostalAddress = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
};

export type CompanyInfo = {
  name: string;
  about: string;
  url: string;
  logo: string;
  address: PostalAddress;
};

export type JobDefaults = {
  location: string;
  employmentType: string;
  workSetup: string;
  startDate: string;
};

export type JobSalary = {
  min: number;
  max: number;
  currency: string;
  period: 'YEAR' | 'MONTH' | 'HOUR';
};

export type Job = {
  slug: string;
  title: string;
  /** Overview can be a single paragraph or an ordered list of paragraphs. */
  overview: string | string[];
  responsibilities: string[];
  requiredQualifications: string[];
  preferredQualifications: string[];
  offer: string[];
  /** Optional per-job overrides of the shared defaults. */
  location?: string;
  employmentType?: string;
  workSetup?: string;
  startDate?: string;
  /** External apply URL (e.g. an ATS-hosted page). When present, the
   *  detail page links here instead of the internal /apply route. */
  applyUrl?: string;
  /** Fields below are required by Google for Jobs structured data.
   *  When `datePosted` is present, the detail page emits a JobPosting
   *  JSON-LD block. */
  datePosted?: string;
  validThrough?: string;
  salary?: JobSalary;
};

export type JobsData = {
  company: CompanyInfo;
  defaults: JobDefaults;
  jobs: Job[];
};

/**
 * A Job with the `defaults` block merged in, so the detail page can
 * render `location`, `employmentType`, etc. without a null check.
 */
export type ResolvedJob = Job & JobDefaults;

const data = jobsData as JobsData;

export function getAllJobs(): Job[] {
  return data.jobs;
}

export function getJobBySlug(slug: string): Job | undefined {
  return data.jobs.find((job) => job.slug === slug);
}

export function getCompany(): CompanyInfo {
  return data.company;
}

export function resolveJob(job: Job): ResolvedJob {
  return {
    ...job,
    location: job.location ?? data.defaults.location,
    employmentType: job.employmentType ?? data.defaults.employmentType,
    workSetup: job.workSetup ?? data.defaults.workSetup,
    startDate: job.startDate ?? data.defaults.startDate,
  };
}

const EMPLOYMENT_TYPE_LD: Record<string, string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Contract: 'CONTRACTOR',
  Internship: 'INTERN',
  Temporary: 'TEMPORARY',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildDescriptionHtml(job: Job, company: CompanyInfo): string {
  const overview = Array.isArray(job.overview) ? job.overview : [job.overview];
  const list = (items: string[]) =>
    `<ul>${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
  return [
    `<p>${escapeHtml(company.about)}</p>`,
    ...overview.map((p) => `<p>${escapeHtml(p)}</p>`),
    '<h3>Responsibilities</h3>',
    list(job.responsibilities),
    '<h3>Required qualifications</h3>',
    list(job.requiredQualifications),
    '<h3>Preferred qualifications</h3>',
    list(job.preferredQualifications),
    '<h3>What we offer</h3>',
    list(job.offer),
  ].join('');
}

/**
 * Build a schema.org JobPosting object suitable for Google for Jobs.
 * Only call this for jobs where `datePosted` is set — that's the
 * signal that the role is configured for structured-data syndication.
 */
export function buildJobPostingJsonLd(
  job: ResolvedJob,
  company: CompanyInfo,
): Record<string, unknown> {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: buildDescriptionHtml(job, company),
    datePosted: job.datePosted,
    employmentType: EMPLOYMENT_TYPE_LD[job.employmentType] ?? 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: company.url,
      logo: `${company.url}${company.logo}`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        ...company.address,
      },
    },
    directApply: false,
  };

  if (job.validThrough) ld.validThrough = job.validThrough;
  if (job.applyUrl) ld.url = job.applyUrl;

  if (job.salary) {
    ld.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: job.salary.currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: job.salary.min,
        maxValue: job.salary.max,
        unitText: job.salary.period,
      },
    };
  }

  return ld;
}

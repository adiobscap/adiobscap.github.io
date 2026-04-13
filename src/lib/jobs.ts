// lib/jobs.ts
//
// Typed access to the canonical jobs data file at src/data/jobs.json.
// This is the single source of truth for all careers content — the
// careers index page, the [slug] detail route, and the [slug]/apply
// route all read from here. Adding a new role is a pure JSON edit.

import jobsData from '@/data/jobs.json';

export type CompanyInfo = {
  name: string;
  about: string;
};

export type JobDefaults = {
  location: string;
  employmentType: string;
  workSetup: string;
  startDate: string;
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

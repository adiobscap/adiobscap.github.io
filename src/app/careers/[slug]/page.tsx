// app/careers/[slug]/page.tsx
//
// Dynamic job detail page. Pre-rendered at build time via
// generateStaticParams() so it works with Next's `output: 'export'`
// mode. All content comes from src/data/jobs.json via src/lib/jobs.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  buildJobPostingJsonLd,
  getAllJobs,
  getCompany,
  getJobBySlug,
  resolveJob,
} from '@/lib/jobs';

// Pre-render one static page per job slug at build time.
export function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  const resolved = resolveJob(job);
  const company = getCompany();
  const overviewParagraphs = Array.isArray(job.overview) ? job.overview : [job.overview];

  // Emit Google for Jobs structured data only when the role opts in
  // by setting `datePosted`. `<` is escaped to prevent a stray
  // </script> sequence in the JSON from breaking parsing.
  const jsonLd = job.datePosted
    ? JSON.stringify(buildJobPostingJsonLd(resolved, company)).replace(/</g, '\\u003c')
    : null;

  return (
    <div className="min-h-screen bg-smoky-black text-white py-24">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <div className="max-w-4xl mx-auto px-8">
        {/* Back Button */}
        <Link
          href="/careers"
          className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Careers
        </Link>

        {/* Job Header */}
        <div className="mb-12">
          <h1 className="font-title text-4xl md:text-5xl font-bold mb-6">{job.title}</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div>
              <h3 className="text-sm text-white/60 mb-1">Job Location</h3>
              <p className="text-white/90">{resolved.location}</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Employment Type</h3>
              <p className="text-white/90">{resolved.employmentType}</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Work Setup</h3>
              <p className="text-white/90">{resolved.workSetup}</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Start Date</h3>
              <p className="text-white/90">{resolved.startDate}</p>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="space-y-8">
          {/* About Section */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-4">About {company.name}</h2>
            <p className="text-white/90 leading-relaxed">{company.about}</p>
          </section>

          {/* Overview Section */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-4">Overview</h2>
            <div className="text-white/90 leading-relaxed space-y-4">
              {overviewParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Key Responsibilities */}
          <BulletSection title="Key Responsibilities" items={job.responsibilities} />

          {/* Required Qualifications */}
          <BulletSection title="Required Qualifications" items={job.requiredQualifications} />

          {/* Preferred Qualifications */}
          <BulletSection title="Preferred Qualifications" items={job.preferredQualifications} />

          {/* We Offer */}
          <BulletSection title="We Offer" items={job.offer} />

          {/* Apply Button */}
          <div className="text-center pt-8">
            {job.applyUrl ? (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Apply for this Position
              </a>
            ) : (
              <Link
                href={`/careers/${job.slug}/apply`}
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Apply for this Position
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
      <h2 className="font-title text-2xl font-bold mb-6">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
            <span className="text-white/90 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

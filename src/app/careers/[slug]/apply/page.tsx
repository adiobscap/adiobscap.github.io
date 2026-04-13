// app/careers/[slug]/apply/page.tsx
//
// Dynamic apply page. Server component wrapper that resolves the slug,
// looks up the job title, and hands both to the client ApplyForm
// component. Pre-rendered per slug at build time via generateStaticParams
// so it works with `output: 'export'`.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllJobs, getJobBySlug } from '@/lib/jobs';
import ApplyForm from './ApplyForm';

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ slug: job.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-smoky-black text-white py-24">
      <div className="max-w-2xl mx-auto px-8">
        {/* Back Button */}
        <Link
          href={`/careers/${job.slug}`}
          className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Job Description
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-title text-4xl md:text-5xl font-bold mb-4">Apply for Position</h1>
          <p className="text-xl text-white/80">{job.title}</p>
        </div>

        {/* Application Form (client) */}
        <ApplyForm slug={job.slug} positionTitle={job.title} />
      </div>
    </div>
  );
}

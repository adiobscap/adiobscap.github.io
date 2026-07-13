import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investor Charter | Obsidian Capital',
  description:
    'SEBI investor charter resources published by Obsidian Investment Pvt. Ltd.',
};

const documents = [
  {
    date: 'SEBI Circular · 21 February 2025',
    title: 'SEBI Investor Charter for Stock Brokers',
    description:
      'The updated charter covers services provided to investors, investor rights, service timelines, dos and don\u2019ts, and grievance redressal mechanisms.',
    pdfHref: '/sebi-investor-charter-stock-brokers.pdf',
    pdfLabel: 'Open charter PDF',
    sourceHref:
      'https://www.sebi.gov.in/legal/circulars/feb-2025/investor-charter-for-stock-brokers_92099.html',
  },
  {
    date: 'SEBI Press Release · 6 December 2024',
    title: 'Empowering Investors through Updated Investor Charter of SEBI',
    description:
      'SEBI\u2019s updated Investor Charter outlines its services, investor expectations and the grievance redressal mechanism.',
    pdfHref: '/sebi-updated-investor-charter.pdf',
    pdfLabel: 'Open updated charter PDF',
    sourceHref:
      'https://www.sebi.gov.in/media-and-notifications/press-releases/dec-2024/empowering-investors-through-updated-investor-charter-of-sebi_89360.html',
  },
];

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="M11.25 3.75h5v5m-.5-4.5-7 7M8.25 5.75h-3a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5v-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InvestorCharterPage() {
  return (
    <div className="min-h-screen bg-smoky-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white/50">
            Regulatory disclosures
          </p>
          <h1 className="font-title text-5xl font-normal tracking-tight sm:text-6xl">
            Investor Charter
          </h1>
          <p className="mt-6 text-base leading-7 text-white/65 sm:text-lg">
            Investor protection and awareness resources issued by the Securities
            and Exchange Board of India (SEBI).
          </p>
        </header>

        <div className="mt-12 grid gap-6">
          {documents.map((document) => (
            <article
              key={document.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                {document.date}
              </p>
              <h2 className="mt-3 font-title text-2xl text-white sm:text-3xl">
                {document.title}
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-white/65">
                {document.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={document.pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  type="application/pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/85"
                >
                  {document.pdfLabel}
                  <ExternalLinkIcon />
                </a>
                <a
                  href={document.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/65 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                >
                  View on SEBI website
                  <ExternalLinkIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

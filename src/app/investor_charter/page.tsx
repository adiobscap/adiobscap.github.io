import type { Metadata } from 'next';
import { companyContact } from '@/config/company';

export const metadata: Metadata = {
  title: 'Investor Charter | Obsidian Capital',
  description:
    'SEBI investor charter resources published by Obsidian Investment Private Limited.',
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

const currentComplaintData = [
  ['Directly from investors', 0, 0, 0, 0, 0, 0, 'N/A'],
  ['SEBI (SCORES 2.0)', 0, 0, 0, 0, 0, 0, 'N/A'],
  ['Stock exchanges', 0, 0, 0, 0, 0, 0, 'N/A'],
  ['Other sources', 0, 0, 0, 0, 0, 0, 'N/A'],
  ['Grand total', 0, 0, 0, 0, 0, 0, 'N/A'],
] as const;

const monthlyComplaintTrend = [
  ['April 2026', 0, 0, 0, 0],
  ['May 2026', 0, 0, 0, 0],
  ['June 2026', 0, 0, 0, 0],
  ['Grand total', 0, 0, 0, 0],
] as const;

const annualComplaintTrend = [
  ['2025–26', 0, 0, 0, 0],
  ['2026–27 (through June 2026)', 0, 0, 0, 0],
  ['Grand total', 0, 0, 0, 0],
] as const;

const tableHeaderClass =
  'border-b border-white/10 px-3 py-3 align-bottom text-xs font-semibold leading-5 text-white/75';
const tableCellClass = 'border-b border-white/10 px-3 py-3 text-white/65';

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

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
            Grievance redressal
          </p>
          <h2 className="mt-3 font-title text-2xl text-white sm:text-3xl">
            Investor grievance contact
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/65">
            Investors should first write to Obsidian Investment Private Limited
            using the dedicated grievance address below. If a grievance is not
            resolved satisfactorily, it may be escalated through SEBI SCORES and,
            after the available grievance process has been exhausted, through
            SMART ODR.
          </p>
          <a
            href={companyContact.grievanceEmailHref}
            className="mt-5 inline-block break-all text-base font-semibold text-white underline decoration-white/30 underline-offset-4 hover:text-white/80"
          >
            {companyContact.grievanceEmail}
          </a>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <a
              href="https://scores.sebi.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              SEBI SCORES
              <ExternalLinkIcon />
            </a>
            <a
              href="https://smartodr.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              SMART ODR
              <ExternalLinkIcon />
            </a>
          </div>
        </section>

        <section
          id="investor-complaints"
          className="mt-6 scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
            Investor complaint disclosure
          </p>
          <h2 className="mt-3 font-title text-2xl text-white sm:text-3xl">
            Investor complaints
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/65">
            Data for the month ended 30 June 2026. Last updated 14 July
            2026. OIPL had not onboarded any clients as of the update date and
            had received no investor complaints.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Complaints by source
          </h3>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Investor complaint data for the month ended 30 June 2026
              </caption>
              <thead className="bg-white/[0.04]">
                <tr>
                  <th scope="col" className={tableHeaderClass}>Received from</th>
                  <th scope="col" className={tableHeaderClass}>Carried forward</th>
                  <th scope="col" className={tableHeaderClass}>Received</th>
                  <th scope="col" className={tableHeaderClass}>Total pending</th>
                  <th scope="col" className={tableHeaderClass}>Resolved</th>
                  <th scope="col" className={tableHeaderClass}>Pending under 3 months</th>
                  <th scope="col" className={tableHeaderClass}>Pending over 3 months</th>
                  <th scope="col" className={tableHeaderClass}>Average resolution time (days)</th>
                </tr>
              </thead>
              <tbody>
                {currentComplaintData.map(([source, ...values]) => (
                  <tr key={source} className={source === 'Grand total' ? 'font-semibold' : undefined}>
                    <th scope="row" className={tableCellClass}>{source}</th>
                    {values.map((value, index) => (
                      <td key={`${source}-${index}`} className={tableCellClass}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Monthly disposal trend
          </h3>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Monthly trend of investor complaint disposal
              </caption>
              <thead className="bg-white/[0.04]">
                <tr>
                  <th scope="col" className={tableHeaderClass}>Month</th>
                  <th scope="col" className={tableHeaderClass}>Carried forward</th>
                  <th scope="col" className={tableHeaderClass}>Received</th>
                  <th scope="col" className={tableHeaderClass}>Resolved</th>
                  <th scope="col" className={tableHeaderClass}>Pending</th>
                </tr>
              </thead>
              <tbody>
                {monthlyComplaintTrend.map(([month, ...values]) => (
                  <tr key={month} className={month === 'Grand total' ? 'font-semibold' : undefined}>
                    <th scope="row" className={tableCellClass}>{month}</th>
                    {values.map((value, index) => (
                      <td key={`${month}-${index}`} className={tableCellClass}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-white">
            Annual disposal trend
          </h3>
          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Annual trend of investor complaint disposal
              </caption>
              <thead className="bg-white/[0.04]">
                <tr>
                  <th scope="col" className={tableHeaderClass}>Year</th>
                  <th scope="col" className={tableHeaderClass}>Carried forward</th>
                  <th scope="col" className={tableHeaderClass}>Received</th>
                  <th scope="col" className={tableHeaderClass}>Resolved</th>
                  <th scope="col" className={tableHeaderClass}>Pending</th>
                </tr>
              </thead>
              <tbody>
                {annualComplaintTrend.map(([year, ...values]) => (
                  <tr key={year} className={year === 'Grand total' ? 'font-semibold' : undefined}>
                    <th scope="row" className={tableCellClass}>{year}</th>
                    {values.map((value, index) => (
                      <td key={`${year}-${index}`} className={tableCellClass}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-xs leading-5 text-white/45">
            “Resolved” includes complaints from previous months resolved in the
            reported period. “Pending” is measured on the final day of the
            period. Average resolution time is not applicable where no
            complaints were resolved.
          </p>
        </section>

        <div className="mt-6 grid gap-6">
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

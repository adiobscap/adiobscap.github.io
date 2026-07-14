import { companyContact } from '@/config/company';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-smoky-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white/50">
            Obsidian Capital
          </p>
          <h1 className="font-title text-5xl font-normal tracking-tight sm:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-base leading-7 text-white/65 sm:text-lg">
            For corporate, regulatory, or general enquiries, contact us using
            the details below.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="font-title text-2xl text-white">Email</h2>
            <a
              href="mailto:admin@obsidiancapital.in"
              className="mt-4 inline-block break-all text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              admin@obsidiancapital.in
            </a>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="font-title text-2xl text-white">Phone</h2>
            <a
              href={companyContact.phoneHref}
              className="mt-4 inline-block text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              {companyContact.phoneDisplay}
            </a>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <h2 className="font-title text-2xl text-white">Office</h2>
            <address className="mt-4 not-italic leading-7 text-white/70">
              601–605, HetDiv Square
              <br />
              Opp. Satyam House
              <br />
              Behind Courtyard Marriott
              <br />
              Sindhu Bhavan Road
              <br />
              Ahmedabad – 380054
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}

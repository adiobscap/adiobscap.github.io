import { companyContact } from '@/config/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-smoky-black text-white py-12 mt-15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-3 text-sm text-white/80">
          <p className="leading-relaxed">
            {"Obsidian Investment Private Limited | SEBI Reg. No.: INZ000330031 | Member of NSE"}
          </p>
          <p className="leading-relaxed">
            Registered Office: 605, Hetdiv Square, behind Hotel Marriott, Opp
            Astral House, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat
            380054, India | Tel:{' '}
            <a href={companyContact.phoneHref} className="hover:text-white">
              {companyContact.phoneDisplay}
            </a>{' '}
            | Email: admin@obsidiancapital.in
          </p>
          <p className="leading-relaxed text-white/70">
            <span className="text-white/80">Client eligibility:</span>{' '}
            Obsidian Investment Private Limited is a{' '}
            <strong>SEBI-registered stock broker and Member of NSE</strong>.{' '}
            Client onboarding and broking services are available exclusively to{' '}
            <strong>institutional clients</strong>. We do not onboard retail
            clients or solicit or accept funds or securities from the general
            public.
          </p>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/80 text-base">
            © {currentYear} Obsidian Investment Private Limited. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

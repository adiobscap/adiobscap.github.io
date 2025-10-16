export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-smoky-black text-white py-12 mt-15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-white/80">
          <div className="space-y-3">
            <h3 className="text-white/90 font-semibold tracking-wide text-xs uppercase">Regulatory Information</h3>
            <p className="leading-relaxed">
              {"{{Company Name}} | SEBI Reg. No.: {{INZXXXXXXXXXXX}} | NSE Member ID(s): {{NSE Cash: XXXXX | F&O: XXXXX | CDS: XXXXX}} {{| BSE Member ID(s): {{BSE Cash: XXXXX}}}}"}
            </p>
            <p className="leading-relaxed">
              {"Registered Office: {{Full Address, City, State, PIN}} | Tel: {{+91-XXXXXXXXXX}} | Email: {{support@yourdomain.com}}"}
            </p>
            <p className="leading-relaxed">
              {"Compliance Officer: {{Full Name}} | Email: {{compliance@yourdomain.com}} | Tel: {{+91-XXXXXXXXXX}}"}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-white/90 font-semibold tracking-wide text-xs uppercase">Investor Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/investor-charter" className="hover:text-white transition-colors">
                  Investor Charter (Stock Brokers)
                </a>
              </li>
              <li>
                <a href="/complaints-disclosure" className="hover:text-white transition-colors">
                  Investor Complaints Disclosure (monthly)
                </a>
              </li>
              <li>
                <a href="/grievance-redressal" className="hover:text-white transition-colors">
                  Grievance Redressal / Escalation Matrix
                </a>
              </li>
              <li>
                <a href="https://scores.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  SCORES (SEBI complaint portal)
                </a>
              </li>
              <li>
                <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  SMART ODR Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-white/90 font-semibold tracking-wide text-xs uppercase">Authorised Persons</h3>
            <ul className="space-y-2">
              <li>
                <a href="/authorised-persons" className="hover:text-white transition-colors">
                  Active APs
                </a>
              </li>
              <li>
                <a href="/authorised-persons-cancelled" className="hover:text-white transition-colors">
                  Cancelled APs (disciplinary)
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-white/90 font-semibold tracking-wide text-xs uppercase">Attention Investors</h3>
            <ul className="space-y-3 list-disc list-inside text-white/70">
              <li>
                Prevent unauthorised transactions in your account — update your mobile number/email ID with your stock broker/depository participant. Receive transaction alerts directly from Exchange/Depository on your mobile/email at the end of the day.
              </li>
              <li>
                KYC is a one-time exercise while dealing in the securities markets — once KYC is done through a SEBI-registered intermediary, you need not undergo the same process again when you approach another intermediary.
              </li>
              <li>
                No need to issue cheques while subscribing to IPOs — use ASBA.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/50 text-sm mb-4">
            Obsidian Capital is a proprietary trading firm, and this website is not intended to attract clients or establish customer relationships. The firm is not offering any securities or other financial instruments for sale, nor is it soliciting investments or other transactions through this site. Nothing on these pages should be interpreted as investment advice. The website exists solely for informational purposes, and Obsidian Capital assumes no duty or obligation concerning the information provided.
          </p>
          <p className="text-white/80 text-base">
            © {currentYear} Obsidian Investment Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-smoky-black text-white py-12 mt-15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-3 text-sm text-white/80">
          <p className="leading-relaxed">
            {"{{Company Legal Name}} | SEBI Reg. No.: {{INZXXXXXXXXXXX}} | Exchange Membership(s): {{NSE – {{Segment(s)}} Member ID: {{XXXXX}}}}{{ | BSE – {{Segment(s)}} Member ID: {{XXXXX}}}}"}
          </p>
          <p className="leading-relaxed">
            {"Registered Office: {{Full Address, City, State, PIN}} | Tel: {{+91-XXXXXXXXXX}} | Email: {{contact@yourdomain.com}}"}
          </p>
          <p className="leading-relaxed">
            {"Compliance Officer: {{Full Name}} | Email: {{compliance@yourdomain.com}} | Tel: {{+91-XXXXXXXXXX}}"}
          </p>
          <p className="leading-relaxed text-white/70">
            <span className="text-white/80">Note:</span> {" {{Company Short Name}} is a "}
            <strong>Proprietary Trading Member</strong>
            {". We "}
            <strong>do not onboard clients</strong>
            {", "}
            <strong>do not solicit or accept funds/securities from the public</strong>
            {", and "}
            <strong>do not offer broking services to investors</strong>
            {". (Prop-only; no client base.)"}
          </p>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/80 text-base">
            © {currentYear} Obsidian Investment Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-smoky-black text-white py-12 mt-15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-3 text-sm text-white/80">
          <p className="leading-relaxed">
            {"Obsidian Investment Pvt. Ltd. | SEBI Reg. No.: INZ000330031 | Member of NSE"}
          </p>
          <p className="leading-relaxed">
            {"Registered Office: 605, Hetdiv Square, behind Hotel Marriott, Opp Astral House, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054, India | Tel: +91 79 26563289 | Email: admin@obsidiancapital.in"}
          </p>
          <p className="leading-relaxed text-white/70">
            <span className="text-white/80">Note:</span> {" Obsidian Capital is a "}
            <strong>Proprietary Trading Member</strong>
            {". We "}
            <strong>do not onboard clients</strong>
            {", "}
            <strong>do not solicit or accept funds/securities from the public</strong>
            {", and "}
            <strong>do not offer broking services to investors.</strong>
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

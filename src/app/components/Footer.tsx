export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-smoky-black text-white py-8 mt-16">
      <div className="container mx-auto px-2 text-center">
        <p className="text-white/50 text-sm mb-3">
        Please note that Obsidian Capital is a proprietary trading firm and is not soliciting customers or customer relationships by means of this website or otherwise. <br />
        Furthermore, Obsidian Capital is not offering any securities or other financial products for sale nor is it soliciting any transactions or investment through this website. The information on this website is not intended to constitute investment advice. <br />
        Obsidian Capital maintains this website for informational purposes only and undertakes no obligation regarding the information contained herein.
        </p>
        <p className="text-white/80 text-base">
          © {currentYear} Obsidian Investment Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
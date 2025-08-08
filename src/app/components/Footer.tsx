export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-smoky-black text-white py-4 mt-15">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-white/50 text-sm mb-4">
        Obsidian Capital is a proprietary trading firm, and this website is not intended to attract clients or establish customer relationships. The firm is not offering any securities or other financial instruments for sale, nor is it soliciting investments or other transactions through this site. Nothing on these pages should be interpreted as investment advice. The website exists solely for informational purposes, and Obsidian Capital assumes no duty or obligation concerning the information provided.
        </p>
        <p className="text-white/80 text-base">
          © {currentYear} Obsidian Investment Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
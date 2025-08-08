// app/careers/page.tsx
import Link from 'next/link';

const positions = [
  {
    title: "Quantitative Trader",
    url: "/careers/quantitative-trader"
  },
  {
    title: "Quantitative Research Engineer", 
    url: "/careers/quantitative-research-engineer"
  },
  {
    title: "Senior Software Engineer",
    url: "/careers/senior-software-engineer"
  }
];

export default function CareersPage() {
  return (
    <div className="h-screen bg-smoky-black text-white flex items-center justify-center -mt-20">
      <div className="max-w-2xl mx-auto px-8">
        <div className="text-center">
          <h1 className="font-title text-4xl md:text-6xl font-regular mb-8 text-white">Careers</h1>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
            <ul className="space-y-6">
              {positions.map((position, index) => (
                <li key={index}>
                  <Link 
                    href={position.url}
                    className="block text-xl md:text-2xl text-white/90 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5"
                  >
                    {position.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
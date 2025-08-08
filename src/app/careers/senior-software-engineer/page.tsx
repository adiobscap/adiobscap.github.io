// app/careers/senior-software-engineer/page.tsx
import Link from 'next/link';

export default function SeniorSoftwareEngineerPage() {
  return (
    <div className="min-h-screen bg-smoky-black text-white py-24">
      <div className="max-w-4xl mx-auto px-8">
        {/* Back Button */}
        <Link 
          href="/careers" 
          className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Careers
        </Link>

        {/* Job Header */}
        <div className="mb-12">
          <h1 className="font-title text-4xl md:text-5xl font-bold mb-6">Senior Software Engineer</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div>
              <h3 className="text-sm text-white/60 mb-1">Job Location</h3>
              <p className="text-white/90">Ahmedabad, Gujarat</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Employment Type</h3>
              <p className="text-white/90">Full-time</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Work Setup</h3>
              <p className="text-white/90">Office</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 mb-1">Start Date</h3>
              <p className="text-white/90">Immediate</p>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="space-y-8">
          {/* About Section */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-4">About Obsidian Capital</h2>
            <p className="text-white/90 leading-relaxed">
              Obsidian Capital is a quantitative trading firm, leveraging algorithms and low-latency technologies 
              to provide liquidity in financial markets. Our team develops and implements advanced trading strategies 
              that quickly respond to market dynamics. We strategically deploy proprietary capital for active trading, 
              utilizing quantitative models to generate consistent returns.
            </p>
          </section>

          {/* Overview Section */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-4">Overview</h2>
            <p className="text-white/90 leading-relaxed">
              Obsidian Capital is seeking a highly skilled Senior Software Engineer responsible for developing tools 
              and infrastructure used by Traders and Quantitative Researchers. In this role, you will be working with 
              others to provide cutting-edge technology solutions that improve our existing trading system. You will have 
              an opportunity to work on high-impact projects that influence the entire organization.
            </p>
          </section>

          {/* Key Responsibilities */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">Key Responsibilities</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Design, develop, and maintain sophisticated trading algorithms</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Optimize code for low-latency performance in a fast-paced trading environment</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Enhance trading and research processes by leveraging and improving our proprietary infrastructure</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Evaluate new technologies and suggest fundamental improvements to our technology stack</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Collaborate with other developers, traders, and quantitative researchers to implement and refine trading strategies</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Identify, troubleshoot, and resolve issues in real-time trading environments</span>
              </li>
            </ul>
          </section>

          {/* Required Qualifications */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">Required Qualifications</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Proficiency in C#/C++/RUST</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">5+ years of professional experience in building software systems</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Solid understanding of data structures, algorithms, and design patterns</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Interest in financial markets and algorithmic trading</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Capability to lead projects</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">High capacity to learn and implement new technologies</span>
              </li>
            </ul>
          </section>

          {/* Preferred Qualifications */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">Preferred Qualifications</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Familiarity with AWS and Linux</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Experience building latency-sensitive applications</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Experience in low-level development</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Experience in quantitative finance or algorithmic trading</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Knowledge of financial markets and trading concepts</span>
              </li>
            </ul>
          </section>

          {/* We Offer */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">We Offer</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Above market compensation</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Year-end performance-based bonus</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Opportunities for professional growth and learning</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Collaborative work environment</span>
              </li>
            </ul>
          </section>

          {/* Apply Button */}
          <div className="text-center pt-8">
            <Link 
              href="/careers/senior-software-engineer/apply"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Apply for this Position
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
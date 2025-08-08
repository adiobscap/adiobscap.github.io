// app/careers/quantitative-research-engineer/page.tsx
import Link from 'next/link';

export default function QuantitativeResearchEngineerPage() {
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
          <h1 className="font-title text-4xl md:text-5xl font-bold mb-6">Quantitative Research Engineer</h1>
          
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
            <div className="text-white/90 leading-relaxed space-y-4">
              <p>
                This is a hybrid role that combines quantitative research, data science, and software engineering. 
                You will be responsible for researching high-frequency datasets, discovering predictive signals, 
                designing backtests, and deploying models to production.
              </p>
              <p>
                This role is ideal for someone who enjoys solving real-world problems using a scientific approach, 
                thrives in fast-paced environments, and wants their work to have a direct trading impact.
              </p>
            </div>
          </section>

          {/* Key Responsibilities */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">Key Responsibilities</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Analyze market and order book data to identify alpha-generating signals</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Prototype and evaluate predictive models using statistical techniques</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Design and run controlled backtests to assess strategy performance and robustness</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Collaborate with traders and engineers to ensure efficient execution and system integration</span>
              </li>
            </ul>
          </section>

          {/* Required Qualifications */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">Required Qualifications</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">4+ years of experience in quantitative research, data science, or software development</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Proficiency in Python/C#/C++/RUST</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Strong background in mathematics, statistics and probability</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Analytical mindset with the ability to interpret market data and performance metrics</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">A proactive mindset with a willingness to take ownership</span>
              </li>
            </ul>
          </section>

          {/* Preferred Qualifications */}
          <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <h2 className="font-title text-2xl font-bold mb-6">Preferred Qualifications</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">PhD in statistics or mathematics is a strong advantage</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-white/90 leading-relaxed">Experience building data models or backtesting infrastructure</span>
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
                <span className="text-white/90 leading-relaxed">Collaborative and dynamic work environment</span>
              </li>
            </ul>
          </section>

          {/* Apply Button */}
          <div className="text-center pt-8">
            <Link 
              href="/careers/quantitative-research-engineer/apply"
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
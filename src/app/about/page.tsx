// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="h-screen bg-smoky-black text-white flex items-center justify-center -mt-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center">
          <h1 className="font-title text-4xl md:text-6xl font-regular mb-8 text-white">About</h1>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
            <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-6">
              Obsidian Capital is a proprietary trading firm leveraging advanced quantitative strategies 
              and algorithmic models in financial markets.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              Our edge lies in sophisticated algorithmic models, rigorous risk management, 
              and cutting-edge technology infrastructure that enables us to identify and capitalize on market inefficiencies.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
// app/page.tsx
'use client';
import CosmosBackground from './components/CosmosBackground';

export default function HomePage() {
  return (
    <section className="relative min-h-screen bg-black text-white">
      {/* Cosmos Background */}
      <CosmosBackground />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-5 pointer-events-none"></div>

      {/* Content Container */}
      <div className="fixed bottom-8 left-8 z-10 pointer-events-none max-w-[90vw] sm:max-w-2xl">
        <div className="flex flex-col pointer-events-auto">
          <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight">
            Decoding Markets
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/70">
            Quantitative trading firm, leveraging algorithms to provide liquidity
            in financial markets
          </p>
        </div>
      </div>
    </section>
  );
}
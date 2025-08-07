// app/page.tsx
export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-smoky-black text-white">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-start max-w-4xl px-8">
        {/* 👇 Add 'font-title' here */}
        <h1 className="font-title text-5xl md:text-7xl font-bold leading-tight">
          Decoding Markets
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/70">
          Quantitative trading firm, leveraging algorithms to provide liquidity
          in financial markets
        </p>
      </div>
    </section>
  );
}
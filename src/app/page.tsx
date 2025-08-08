// app/page.tsx
'use client';

export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-smoky-black text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          filter: 'blur(0px)',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
        onLoadedData={() => {
          const video = document.querySelector('video') as HTMLVideoElement;
          if (video) {
            video.currentTime = 0.1; // Start slightly after beginning to avoid black frame
          }
        }}
      >
        <source src="/logo-dimmer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-smoky-black/20"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-start max-w-4xl px-4 md:px-8">
        <h1 className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
          Decoding Markets
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl">
          Quantitative trading firm, leveraging algorithms to provide liquidity
          in financial markets
        </p>
      </div>
    </section>
  );
}
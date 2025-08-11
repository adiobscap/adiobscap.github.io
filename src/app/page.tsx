// app/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoSupported, setIsVideoSupported] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check if video is supported (especially for Safari mobile)
    const checkVideoSupport = () => {
      const video = document.createElement('video');
      const canPlay = video.canPlayType('video/mp4');
      setIsVideoSupported(canPlay !== '');
    };
    
    checkMobile();
    checkVideoSupport();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-smoky-black text-white">
      {/* Background Video - Desktop and mobile with Safari support */}
      {isVideoSupported && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload={isMobile ? "none" : "metadata"}
          poster="/logo-poster.jpg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
          onLoadStart={() => {
            // Force video to start on Safari mobile
            const video = document.querySelector('video') as HTMLVideoElement;
            if (video && isMobile) {
              video.load();
            }
          }}
          onLoadedData={() => {
            const video = document.querySelector('video') as HTMLVideoElement;
            if (video) {
              video.currentTime = 0.1;
              // Ensure video plays on Safari mobile
              if (isMobile) {
                video.play().catch(() => {
                  // Fallback if autoplay is blocked
                  console.log('Video autoplay blocked on mobile');
                });
              }
            }
          }}
        >
          <source src="/logo-dimmer.mp4" type="video/mp4" />
        </video>
      )}
      
      {/* Fallback background for unsupported video */}
      {!isVideoSupported && (
        <div className="absolute inset-0 bg-gradient-to-br from-smoky-black via-gray-900 to-smoky-black opacity-90"></div>
      )}
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
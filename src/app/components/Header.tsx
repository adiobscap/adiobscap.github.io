'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
        // Clear any existing timeout
        if (timeoutId) clearTimeout(timeoutId);
        
        // If scrolling down, set timeout to hide header after 2 seconds
        if (currentScrollY > lastScrollY && currentScrollY > 10) {
          timeoutId = setTimeout(() => {
            setIsVisible(false);
          }, 2000);
        }
      } else {
        // Scrolling down - show initially, then hide after 2 seconds
        if (isVisible) {
          timeoutId = setTimeout(() => {
            setIsVisible(false);
          }, 2000);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY, isVisible]);

  return (
    <header
      className={`w-full shadow-md fixed top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        background: 'linear-gradient(to bottom, #0f0520, #000000)'
      }}
    >
      <div className="w-full flex justify-between items-center px-8 py-4 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          <Image 
            src="/logo.svg" 
            alt="Obsidian Capital Logo" 
            width={48} 
            height={48}
            className="md:w-[72px] md:h-[72px]"
            priority
            sizes="(max-width: 768px) 48px, 72px"
            loading="eager"
            fetchPriority="high"
            placeholder="empty"
          />
          <span className="text-xl md:text-3xl font-title tracking-tight">Obsidian Capital</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 my-0.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-smoky-black border-t border-white/20">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-8 py-3 text-lg font-medium text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
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
    <header className={`bg-smoky-black w-full shadow-md fixed top-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto flex justify-between items-center p-4 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.svg" alt="Obsidian Capital Logo" width={72} height={72} />
          <span className="text-3xl font-title tracking-tight">Obsidian Capital</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              // 👇 Change text color to white with 80% opacity, and hover to full white
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
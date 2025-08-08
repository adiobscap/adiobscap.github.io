// app/layout.tsx
import type { Metadata } from 'next';
// 1. Import the fonts from Google
import { Figtree, EB_Garamond } from 'next/font/google'; 
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

// 2. Configure the fonts
// Figtree will be our default body font
const fontBody = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// EB Garamond will be our title font
const fontTitle = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'], // Only include used weights
  display: 'swap',
  variable: '--font-title',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

export const metadata: Metadata = {
  title: 'Obsidian Capital - Quantitative Trading Firm',
  description: 'Quantitative trading firm leveraging algorithms to provide liquidity in financial markets',
  keywords: 'quantitative trading, algorithmic trading, financial markets, liquidity',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a1a1a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 3. Apply the font variables to the body tag */}
      <body
        className={`${fontBody.variable} ${fontTitle.variable} bg-smoky-black font-sans`}
      >
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
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
  display: 'swap', // Ensures text is visible while font loads
  variable: '--font-body', // Creates a CSS variable for the body font
});

// EB Garamond will be our title font
const fontTitle = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Include weights you might need
  display: 'swap',
  variable: '--font-title', // Creates a CSS variable for the title font
});

export const metadata: Metadata = {
  title: 'Obsidian Capital',
  description: 'Quantitative trading firm',
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
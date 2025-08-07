import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        title: ['var(--font-title)', 'serif'],
      },
      colors: {
        'smoky-black': '#0F0F0F',
        'russian-violet': '#240041',
        'neon-blue': '#3001A6',
        'white': '#FFFFFF',
      },
      backgroundImage: {
        'hero-pattern': "url('/background-pattern.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
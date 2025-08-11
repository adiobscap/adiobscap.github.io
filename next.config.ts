import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Enable static exports for the App Router.
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',

  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // This is recommended for static exports.
  trailingSlash: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
 
  // Optional: Disable image optimization for static exports
  // This is recommended for GitHub Pages.
  images: {
    unoptimized: true,
  },

  // Force rebuild - timestamp: 2025-01-11
  generateBuildId: () => 'build-' + Date.now(),
};

export default nextConfig;
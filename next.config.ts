import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // CLOUDFLARE PAGES DEPLOYMENT CONFIG
  // ============================================
  // If you are using NextAuth and Server Actions, you CANNOT use static export.
  // Deploy using Vercel, or use @cloudflare/next-on-pages if deploying to Cloudflare.
  // output: "export",

  // Next.js Image Optimization requires a Node server,
  // which Cloudflare Pages doesn't have. This tells Next.js
  // to use regular <img> tags instead.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },

  // Trailing slashes help Cloudflare Pages resolve routes correctly
  trailingSlash: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // CLOUDFLARE PAGES DEPLOYMENT CONFIG
  // ============================================
  // Static export generates pure HTML/CSS/JS files
  // that Cloudflare Pages can serve directly — no Node.js server needed.
  output: "export",

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

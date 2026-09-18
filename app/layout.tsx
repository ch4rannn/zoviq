import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import StorefrontShell from "@/components/layout/StorefrontShell";

// ------------------------------------
// Font Setup
// ------------------------------------
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// ------------------------------------
// Full SEO Metadata
// ------------------------------------
export const metadata: Metadata = {
  // Basic SEO
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),

  // Keywords
  keywords: [
    "ZOVIQ",
    "streetwear",
    "oversized t-shirts",
    "graphic tees",
    "Gen-Z fashion",
    "Indian streetwear",
    "premium clothing",
    "affordable streetwear India",
    "minimalist fashion",
  ],

  // Author & Creator
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,

  // Open Graph — for Facebook, LinkedIn, WhatsApp
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Premium Streetwear`,
      },
    ],
  },

  // Twitter Card — for Twitter/X
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.jpg"],
    creator: "@zoviq",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your codes when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  // },

  // Manifest
  manifest: "/manifest.json",

  // Other
  category: "fashion",
};

// ------------------------------------
// Structured Data (JSON-LD)
// ------------------------------------
// This tells Google exactly what ZOVIQ is — appears in rich search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: `${SITE_URL}/images/og-image.jpg`,
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://instagram.com/zoviq",
    "https://twitter.com/zoviq",
  ],
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ------------------------------------
// Root Layout
// ------------------------------------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* Structured Data for rich Google results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <StorefrontShell>
          {children}
        </StorefrontShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

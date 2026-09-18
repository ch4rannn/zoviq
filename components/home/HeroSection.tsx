// ==================================
// Hero Section
// ==================================
// Full-width hero with background image, headline, and CTA.
// First thing visitors see on the homepage.

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const heroContent = {
    headline: "REDEFINE\nYOUR STYLE",
    subheadline: "Premium streetwear for the new generation. Bold. Minimal. Unapologetic.",
    ctaText: "SHOP NOW",
    ctaLink: "/shop"
  };

  return (
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="ZOVIQ streetwear fashion"
        fill
        priority // Load this image first — it's above the fold
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient overlay — makes text readable over the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Text content — positioned bottom-left */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-[1400px] w-full mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-xl">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-4 whitespace-pre-wrap">
              {heroContent.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-md leading-relaxed">
              {heroContent.subheadline}
            </p>

            {/* CTA Button */}
            <Link
              href={heroContent.ctaLink}
              className="inline-flex items-center justify-center px-10 py-4.5 bg-white text-black text-base font-semibold uppercase tracking-[0.05em] hover:bg-gray-200 active:scale-[0.98] transition-all duration-200"
            >
              {heroContent.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

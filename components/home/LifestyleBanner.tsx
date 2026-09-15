// ==================================
// Lifestyle Banner Section
// ==================================
// Full-width lifestyle image with text overlay and CTA.
// Breaks up product sections with visual storytelling.

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function LifestyleBanner() {
  return (
    <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
      {/* Background lifestyle image */}
      <Image
        src="/images/lifestyle.jpg"
        alt="ZOVIQ streetwear lifestyle"
        fill
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content — centered */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            MADE FOR THE STREETS
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-md mx-auto">
            Where comfort meets confidence. Wear what moves you.
          </p>
          <Link
              href="/shop"
              className="inline-flex items-center justify-center px-10 py-4.5 text-base font-semibold uppercase tracking-[0.05em] border-[1.5px] border-white text-white hover:bg-white hover:text-black active:scale-[0.98] transition-all duration-200"
            >
              EXPLORE
            </Link>
        </div>
      </div>
    </section>
  );
}

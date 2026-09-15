// ==================================
// Brand Statement Section
// ==================================
// Bold brand message — minimal, centered, large typography.
// Creates visual rhythm between product sections.

import { SITE_NAME } from '@/lib/constants';

export default function BrandStatement() {
  return (
    <section className="py-16 md:py-24 bg-primary text-secondary">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 text-center">
        {/* Accent divider */}
        <div className="w-12 h-[2px] bg-accent mx-auto mb-8" />

        {/* Main statement */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-3xl mx-auto mb-6">
          {SITE_NAME} IS NOT JUST CLOTHING.
          <br />
          <span className="text-accent">IT&apos;S A STATEMENT.</span>
        </h2>

        {/* Supporting text */}
        <p className="text-base md:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
          Born from the streets, designed for those who dare to stand out.
          Premium quality. Uncompromising style.
        </p>
      </div>
    </section>
  );
}

// ==================================
// Social Section
// ==================================
// Instagram-style grid showing lifestyle photos.
// Links to the ZOVIQ Instagram account.
// For MVP, uses the product images in a grid layout.

import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants';

// Using product and lifestyle images as social feed placeholders
const socialImages = [
  { src: '/images/product-1.jpg', alt: 'ZOVIQ streetwear look 1' },
  { src: '/images/lifestyle.jpg', alt: 'ZOVIQ streetwear look 2' },
  { src: '/images/product-3.jpg', alt: 'ZOVIQ streetwear look 3' },
  { src: '/images/product-2.jpg', alt: 'ZOVIQ streetwear look 4' },
  { src: '/images/hero.jpg', alt: 'ZOVIQ streetwear look 5' },
  { src: '/images/product-4.jpg', alt: 'ZOVIQ streetwear look 6' },
];

export default function SocialSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2">
            FOLLOW @ZOVIQ
          </h2>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-accent transition-colors"
          >
            @zoviq on Instagram →
          </a>
        </div>

        {/* Instagram-style grid — 3 columns on mobile, 6 on desktop */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
          {socialImages.map((image, index) => (
            <a
              key={index}
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-gray-100"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-400 group-hover:scale-110"
              />

              {/* Hover overlay with Instagram icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

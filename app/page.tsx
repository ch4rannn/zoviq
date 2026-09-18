// ==================================
// ZOVIQ Homepage
// ==================================
// The main landing page visitors see.
// Composed of multiple sections defined in the design system.
//
// DATA SOURCE:
// Fetches live products from the Shopify Storefront API.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ZOVIQ — Premium Streetwear | Oversized Tees, Graphic Tees & More',
  description:
    'Shop ZOVIQ — India\'s premium Gen-Z streetwear brand. Oversized t-shirts, graphic tees, minimalist styles. Free shipping over ₹999. Bold. Minimal. Unapologetic.',
  alternates: {
    canonical: '/',
  },
};

import HeroSection from '@/components/home/HeroSection';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import BrandStatement from '@/components/home/BrandStatement';
import LifestyleBanner from '@/components/home/LifestyleBanner';
import SocialSection from '@/components/home/SocialSection';
import Newsletter from '@/components/home/Newsletter';
import { getProducts } from '@/lib/shopify';

export default async function HomePage() {
  // Fetch live data from Shopify Storefront API
  const allProducts = await getProducts({ first: 8 });
  const newArrivals = await getProducts({ first: 4, sortKey: 'CREATED_AT', reverse: true });
  const bestSellers = await getProducts({ first: 4, sortKey: 'BEST_SELLING' });

  return (
    <>
      {/* 1. Hero — Full-screen hero with CTA */}
      <HeroSection />

      {/* 2. Featured Collection — All products */}
      <FeaturedCollection
        title="THE COLLECTION"
        products={allProducts}
        collectionHandle="all"
      />

      {/* 3. Brand Statement — "ZOVIQ is not just clothing..." */}
      <BrandStatement />

      {/* 4. New Arrivals */}
      <FeaturedCollection
        title="NEW ARRIVALS"
        products={newArrivals}
        collectionHandle="new-arrivals"
      />

      {/* 5. Lifestyle Banner — Full-width image */}
      <LifestyleBanner />

      {/* 6. Best Sellers */}
      <FeaturedCollection
        title="BEST SELLERS"
        products={bestSellers}
        collectionHandle="best-sellers"
      />

      {/* 7. Social Section — Instagram grid */}
      <SocialSection />

      {/* 8. Newsletter — Email signup */}
      <Newsletter />
    </>
  );
}

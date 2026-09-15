// ==================================
// Featured Collection Section
// ==================================
// Horizontal row of product cards from a specific collection.
// Shows 4 products on desktop, 2 on mobile (scrollable).

import Link from 'next/link';
import type { Product } from '@/types/shopify';
import ProductCard from '@/components/product/ProductCard';

interface FeaturedCollectionProps {
  title: string;
  products: Product[];
  collectionHandle?: string; // Link to the full collection page
}

export default function FeaturedCollection({
  title,
  products,
  collectionHandle,
}: FeaturedCollectionProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {title}
          </h2>
          {collectionHandle && (
            <Link
              href={`/collection/${collectionHandle}`}
              className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
            >
              View All
              {/* Chevron right icon */}
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Product grid — 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

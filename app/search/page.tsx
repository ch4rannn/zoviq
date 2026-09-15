// ==================================
// Search Results Page
// ==================================
// Shows search results based on the 'q' query parameter.
// e.g. /search?q=black

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import ProductGrid from '@/components/product/ProductGrid';

function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  // Very basic mock search implementation (case-insensitive title match)
  const results = searchQuery
    ? MOCK_PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_PRODUCTS; // Show all products if no query

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-4 uppercase">
          {searchQuery ? 'Search Results' : 'All Products'}
        </h1>
        {searchQuery && (
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Showing results for &quot;<span className="font-semibold text-primary">{searchQuery}</span>&quot;
          </p>
        )}
      </div>

      <div className="w-full">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1400px] mx-auto px-4 py-20 text-center text-gray-400">
          Searching...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}

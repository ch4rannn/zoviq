// ==================================
// Search Results Page
// ==================================
// Shows search results based on the 'q' query parameter.
// e.g. /search?q=black

'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { searchProducts, getProducts } from '@/lib/shopify';
import ProductGrid from '@/components/product/ProductGrid';

function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function fetchResults() {
      if (searchQuery) {
        const res = await searchProducts(searchQuery);
        setResults(res);
      } else {
        const res = await getProducts({ first: 20 });
        setResults(res);
      }
    }
    fetchResults();
  }, [searchQuery]);

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

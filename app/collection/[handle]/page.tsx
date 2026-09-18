// ==================================
// Collection Page
// ==================================
// Displays products in a specific collection (e.g. New Arrivals).

import { notFound } from 'next/navigation';
import { getCollection, getProducts } from '@/lib/shopify';
import ProductGrid from '@/components/product/ProductGrid';

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  let products = [];
  let title = '';
  let description = '';

  // For specific hardcoded routes without actual Shopify collections
  if (handle === 'new-arrivals') {
    products = await getProducts({ first: 20, sortKey: 'CREATED_AT', reverse: true });
    title = 'New Arrivals';
    description = 'The latest streetwear drops from ZOVIQ.';
  } else if (handle === 'best-sellers') {
    products = await getProducts({ first: 20, sortKey: 'BEST_SELLING' });
    title = 'Best Sellers';
    description = 'Our most popular styles, chosen by the streets.';
  } else if (handle === 'all') {
    products = await getProducts({ first: 100 });
    title = 'All Products';
    description = 'Explore the full ZOVIQ collection.';
  } else {
    // Try to fetch from Shopify collections
    const collection = await getCollection(handle);
    if (!collection) {
      notFound();
    }
    products = collection.products;
    title = collection.title;
    description = collection.description || '';
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-4 uppercase">
          {title}
        </h1>
        {description && (
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="w-full">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';

// ==================================
// All Products Page
// ==================================
// Displays all products in a grid.
// Equivalent to the "Shop" link in the navbar.

import { MOCK_PRODUCTS } from '@/lib/mock-data';
import ProductGrid from '@/components/product/ProductGrid';

// TODO: Replace with Shopify API in Phase 5
// import { getProducts } from '@/lib/shopify';

export const metadata = {
  title: 'Shop All',
  description: 'Shop the entire ZOVIQ collection of premium streetwear.',
};

export default async function ShopPage() {
  // const products = await getProducts();
  const products = MOCK_PRODUCTS;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-primary mb-4 uppercase">
          Shop All
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto">
          Explore our full collection of premium streetwear. 
          Oversized fits, bold graphics, and uncompromising quality.
        </p>
      </div>

      {/* TODO: Add filtering/sorting sidebar in Phase 6 */}
      <div className="w-full">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

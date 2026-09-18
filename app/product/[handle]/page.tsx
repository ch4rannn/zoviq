// ==================================
// Product Details Page
// ==================================
// The main product view. Fetches a specific product by its handle (slug).
// e.g. /product/oversized-essential-tee-black

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProduct, getProducts } from '@/lib/shopify';
import { formatPrice } from '@/lib/utils';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductForm from '@/components/product/ProductForm';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import Badge from '@/components/ui/Badge';

// Dynamic metadata — unique title & description per product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.handle);

  if (!product) return { title: 'Product Not Found' };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} | ZOVIQ`,
      description: product.description,
      images: product.images.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.altText || product.title,
      })),
    },
    alternates: {
      canonical: `/product/${product.handle}`,
    },
  };
}

interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  // Fetch from live Shopify
  const product = await getProduct(resolvedParams.handle);

  if (!product) {
    notFound();
  }

  // Get some "You Might Also Like" products (excluding the current one)
  const allProducts = await getProducts({ first: 10 });
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: Image Gallery */}
          <div className="w-full lg:w-[55%]">
            <ProductImageGallery images={product.images} />
          </div>

          {/* Right Column: Product Info & Form */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4">
            
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.tags.includes('new') && <Badge variant="new">NEW</Badge>}
              {!product.availableForSale && <Badge variant="soldOut">SOLD OUT</Badge>}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-6">
              {product.title}
            </h1>

            {/* Selection Form & Add to Cart */}
            <div className="mb-10">
              <ProductForm product={product} />
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-gray-900 mb-4">
                Description
              </h3>
              <div 
                className="prose prose-sm text-gray-600 max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
              />
            </div>
            
            {/* Shipping Info Accordion (Placeholder for Phase 6 polish) */}
            <div className="border-t border-gray-200 mt-8 pt-6 pb-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-gray-900 mb-2">
                Shipping & Returns
              </h3>
              <p className="text-sm text-gray-500">
                Free shipping on orders over ₹999. Easy 7-day returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <FeaturedCollection title="YOU MIGHT ALSO LIKE" products={relatedProducts} />
      )}
    </>
  );
}

export async function generateStaticParams() {
  // Try to pre-render top products, or just return empty for dynamic routing
  try {
    const products = await getProducts({ first: 10 });
    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    return [];
  }
}

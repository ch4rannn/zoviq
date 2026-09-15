// ==================================
// Product Card Component
// ==================================
// Displays a single product in a grid — image, name, price, discount.
// Used in: Featured Collection, New Arrivals, Best Sellers, Shop page.

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/shopify';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get the first image (main product image)
  const image = product.images[0];

  // Get prices for display
  const currentPrice = product.priceRange.minVariantPrice.amount;
  const comparePrice = product.compareAtPriceRange.minVariantPrice.amount;

  // Check if product is on sale (compare-at price is higher than current price)
  const isOnSale =
    parseFloat(comparePrice) > parseFloat(currentPrice);
  const discountPercent = isOnSale
    ? getDiscountPercentage(comparePrice, currentPrice)
    : 0;

  // Check if product is new (has "new" tag)
  const isNew = product.tags.includes('new');

  // Check if product is sold out
  const isSoldOut = !product.availableForSale;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="group block"
      aria-label={`View ${product.title}`}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
        )}

        {/* Badges — positioned top-left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {isSoldOut && <Badge variant="soldOut">SOLD OUT</Badge>}
          {!isSoldOut && isOnSale && <Badge variant="sale">SALE</Badge>}
          {!isSoldOut && isNew && !isOnSale && <Badge variant="new">NEW</Badge>}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {/* Product Name — max 2 lines, truncate with ellipsis */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">
            {formatPrice(currentPrice)}
          </span>

          {isOnSale && (
            <>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(comparePrice)}
              </span>
              <span className="text-sm font-semibold text-sale">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

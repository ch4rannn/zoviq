// ==================================
// Product Form
// ==================================
// Manages variant selection and quantity before adding to cart.
// It maps the user's selected options to a specific variant ID.

'use client';

import { useState, useMemo } from 'react';
import type { Product, ProductVariant } from '@/types/shopify';
import OptionSelector from '@/components/product/OptionSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import { formatPrice } from '@/lib/utils';

interface ProductFormProps {
  product: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  // Initialize with the first available variant's options, or empty if none
  const firstAvailableVariant = product.variants.find(
    (variant) => variant.availableForSale
  );
  
  const initialOptions: Record<string, string> = {};
  if (firstAvailableVariant) {
    firstAvailableVariant.selectedOptions.forEach((opt) => {
      initialOptions[opt.name] = opt.value;
    });
  }

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);
  const [quantity, setQuantity] = useState(1);

  // Find the variant that matches the currently selected options
  const currentVariant = useMemo(() => {
    return product.variants.find((variant) => {
      return variant.selectedOptions.every(
        (opt) => selectedOptions[opt.name] === opt.value
      );
    });
  }, [product.variants, selectedOptions]);

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isAvailable = currentVariant?.availableForSale ?? false;
  const currentPrice = currentVariant
    ? currentVariant.price.amount
    : product.priceRange.minVariantPrice.amount;
  const comparePrice = currentVariant?.compareAtPrice
    ? currentVariant.compareAtPrice.amount
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Dynamic Price Display */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold text-primary">
          {formatPrice(currentPrice)}
        </span>
        {comparePrice && parseFloat(comparePrice) > parseFloat(currentPrice) && (
          <span className="text-lg text-gray-400 line-through">
            {formatPrice(comparePrice)}
          </span>
        )}
      </div>

      {/* Options */}
      {product.options.map((option) => (
        <OptionSelector
          key={option.id}
          option={option}
          selectedValue={selectedOptions[option.name]}
          onChange={(value) => handleOptionChange(option.name, value)}
        />
      ))}

      {/* Add To Cart Row */}
      <div className="flex gap-4 items-end">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.05em] text-gray-900 mb-3">
            Quantity
          </h3>
          <QuantitySelector quantity={quantity} onChange={setQuantity} />
        </div>
        <div className="flex-1">
          <AddToCartButton
            variantId={currentVariant?.id || null}
            quantity={quantity}
            availableForSale={isAvailable}
          />
        </div>
      </div>
    </div>
  );
}

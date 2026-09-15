// ==================================
// Add To Cart Button
// ==================================
// Adds a specific product variant to the cart.
// Shows loading state during the network request.

'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';

interface AddToCartButtonProps {
  variantId: string | null;
  quantity: number;
  availableForSale: boolean;
}

export default function AddToCartButton({
  variantId,
  quantity,
  availableForSale,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!variantId || !availableForSale) return;

    setIsLoading(true);

    try {
      await addToCart([{ merchandiseId: variantId, quantity }]);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSoldOut = !availableForSale;
  const isReady = !!variantId && availableForSale;

  return (
    <Button
      variant="primary"
      size="full"
      onClick={handleAddToCart}
      disabled={!isReady}
      isLoading={isLoading}
      className="h-12"
    >
      {isSoldOut ? 'Sold Out' : !variantId ? 'Select an Option' : 'Add to Cart'}
    </Button>
  );
}

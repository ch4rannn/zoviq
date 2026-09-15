// ==================================
// Cart Drawer
// ==================================
// Slide-out panel from the right displaying the shopping cart.
// Allows users to modify quantities or remove items before checkout.

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import QuantitySelector from '@/components/product/QuantitySelector';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateCartItem, removeFromCart } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // If cart isn't loaded yet, return null
  if (!cart) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-secondary z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold uppercase tracking-tight text-primary">
            Your Cart ({cart.totalQuantity})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 -mr-2 text-gray-500 hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items or Empty State */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.lines.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">Your cart is empty.</p>
                <p className="text-sm text-gray-500 mt-1">
                  Looks like you haven&apos;t added anything yet.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  closeCart();
                }}
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.lines.map((line) => {
                const image = line.merchandise.product.images[0];
                return (
                  <li key={line.id} className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/product/${line.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="relative w-24 aspect-[3/4] bg-gray-100 flex-shrink-0"
                    >
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText || line.merchandise.product.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${line.merchandise.product.handle}`}
                            onClick={closeCart}
                            className="font-medium text-sm hover:underline leading-snug"
                          >
                            {line.merchandise.product.title}
                          </Link>
                          <span className="font-semibold text-sm">
                            {formatPrice(line.cost.totalAmount.amount)}
                          </span>
                        </div>
                        {/* Options (e.g., Size: L) */}
                        {line.merchandise.selectedOptions.map((opt) => (
                          <p key={opt.name} className="text-xs text-gray-500 mt-1">
                            {opt.name}: {opt.value}
                          </p>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <QuantitySelector
                          quantity={line.quantity}
                          onChange={(qty) => updateCartItem(line.id, qty)}
                        />
                        <button
                          onClick={() => removeFromCart(line.id)}
                          className="text-xs font-medium text-gray-400 hover:text-error underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with Checkout */}
        {cart.lines.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-medium text-gray-900">Subtotal</span>
              <span className="text-lg font-semibold text-primary">
                {formatPrice(cart.cost.subtotalAmount.amount)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <Button
              variant="primary"
              size="full"
              onClick={() => {
                // For MVP, if real shopify isn't connected, redirect to a mock checkout
                window.location.href = cart.checkoutUrl;
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

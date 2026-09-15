// ==================================
// Cart Context
// ==================================
// Global state management for the shopping cart.
// Wraps the entire app so any component can access/modify the cart.
// For now, it uses mock data and local storage, but it is structured
// to seamlessly switch to the real Shopify API.

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Cart, CartLine, CartLineInput } from '@/types/shopify';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface CartContextType {
  cart: Cart | null;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (lines: CartLineInput[]) => Promise<void>;
  updateCartItem: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('zoviq_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    } else {
      // Create empty default cart
      const emptyCart: Cart = {
        id: 'mock-cart-id',
        checkoutUrl: '/checkout',
        totalQuantity: 0,
        cost: {
          subtotalAmount: { amount: '0', currencyCode: 'INR' },
          totalAmount: { amount: '0', currencyCode: 'INR' },
          totalTaxAmount: null,
        },
        lines: [],
      };
      setCart(emptyCart);
    }
  }, []);

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem('zoviq_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Re-calculate cart totals after any modification
  const calculateTotals = (lines: CartLine[]): Cart => {
    let totalQuantity = 0;
    let totalAmount = 0;

    lines.forEach((line) => {
      totalQuantity += line.quantity;
      totalAmount += parseFloat(line.cost.totalAmount.amount);
    });

    return {
      id: cart?.id || 'mock-cart-id',
      checkoutUrl: '/checkout',
      totalQuantity,
      cost: {
        subtotalAmount: { amount: totalAmount.toString(), currencyCode: 'INR' },
        totalAmount: { amount: totalAmount.toString(), currencyCode: 'INR' },
        totalTaxAmount: null,
      },
      lines,
    };
  };

  const addToCart = async (lines: CartLineInput[]) => {
    if (!cart) return;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // MOCK IMPLEMENTATION: Add lines to cart
    // In production, you would call Shopify API createCart or addToCart here
    
    let newLines = [...cart.lines];

    lines.forEach((inputLine) => {
      // Find the mock product variant
      const product = MOCK_PRODUCTS.find((p) =>
        p.variants.some((v) => v.id === inputLine.merchandiseId)
      );

      if (!product) return;
      const variant = product.variants.find((v) => v.id === inputLine.merchandiseId);
      if (!variant) return;

      // Check if line already exists in cart
      const existingLineIndex = newLines.findIndex(
        (l) => l.merchandise.id === variant.id
      );

      if (existingLineIndex >= 0) {
        // Update quantity
        newLines[existingLineIndex].quantity += inputLine.quantity;
        newLines[existingLineIndex].cost.totalAmount.amount = (
          parseFloat(variant.price.amount) * newLines[existingLineIndex].quantity
        ).toString();
      } else {
        // Add new line
        newLines.push({
          id: `line-${Date.now()}-${Math.random()}`, // Mock line ID
          quantity: inputLine.quantity,
          cost: {
            totalAmount: {
              amount: (parseFloat(variant.price.amount) * inputLine.quantity).toString(),
              currencyCode: 'INR',
            },
          },
          merchandise: {
            id: variant.id,
            title: variant.title,
            selectedOptions: variant.selectedOptions,
            product: {
              title: product.title,
              handle: product.handle,
              images: product.images,
            },
          },
        });
      }
    });

    setCart(calculateTotals(newLines));
    openCart(); // Automatically open cart when adding
  };

  const updateCartItem = async (lineId: string, quantity: number) => {
    if (!cart) return;
    
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const newLines = cart.lines.map((line) => {
      if (line.id === lineId) {
        // Calculate single item price by dividing total by quantity
        const unitPrice = parseFloat(line.cost.totalAmount.amount) / line.quantity;
        return {
          ...line,
          quantity,
          cost: {
            totalAmount: {
              amount: (unitPrice * quantity).toString(),
              currencyCode: 'INR',
            },
          },
        };
      }
      return line;
    });

    setCart(calculateTotals(newLines));
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;
    
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const newLines = cart.lines.filter((line) => line.id !== lineId);
    setCart(calculateTotals(newLines));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartCount: cart?.totalQuantity || 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

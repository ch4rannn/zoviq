// ==================================
// Cart Context
// ==================================
// Global state management for the shopping cart.
// Wraps the entire app so any component can access/modify the cart.
// For now, it uses mock data and local storage, but it is structured
// to seamlessly switch to the real Shopify API.

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Cart, CartLineInput } from '@/types/shopify';
import { createCart, addToCart as apiAddToCart, updateCart, removeFromCart as apiRemoveFromCart, getCart } from '@/lib/shopify';

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
    async function initCart() {
      const savedCartId = localStorage.getItem('zoviq_cart_id');
      if (savedCartId) {
        try {
          const existingCart = await getCart(savedCartId);
          if (existingCart) {
            setCart(existingCart);
            return;
          }
        } catch (e) {
          console.error('Failed to fetch existing cart', e);
        }
      }
      
      // If no saved cart or cart is expired, create a new one
      try {
        const newCart = await createCart();
        setCart(newCart);
        localStorage.setItem('zoviq_cart_id', newCart.id);
      } catch (e) {
        console.error('Failed to create cart', e);
      }
    }

    initCart();
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = async (lines: CartLineInput[]) => {
    if (!cart) return;

    try {
      const updatedCart = await apiAddToCart(cart.id, lines);
      setCart(updatedCart);
      openCart();
    } catch (e) {
      console.error('Failed to add to cart', e);
    }
  };

  const updateCartItem = async (lineId: string, quantity: number) => {
    if (!cart) return;
    
    try {
      const updatedCart = await updateCart(cart.id, [{ id: lineId, quantity }]);
      setCart(updatedCart);
    } catch (e) {
      console.error('Failed to update cart item', e);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;
    
    try {
      const updatedCart = await apiRemoveFromCart(cart.id, [lineId]);
      setCart(updatedCart);
    } catch (e) {
      console.error('Failed to remove from cart', e);
    }
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

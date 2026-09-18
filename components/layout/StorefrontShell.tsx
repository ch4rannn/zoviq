// ==================================
// Storefront Shell
// ==================================
// Wraps all pages with Navbar, Footer, Cart drawer.

'use client';

import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cart-context';
import CartDrawer from '@/components/cart/CartDrawer';

export default function StorefrontShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}

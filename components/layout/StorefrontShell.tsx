// ==================================
// Storefront Shell
// ==================================
// Wraps only storefront pages (not admin) with Navbar, Footer, Cart.
// On admin pages (/admin/*), this component renders just the children.

'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/lib/cart-context';
import CartDrawer from '@/components/cart/CartDrawer';

export default function StorefrontShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  // Admin pages get their own layout — skip storefront chrome
  if (isAdmin) {
    return <>{children}</>;
  }

  // Storefront pages get the full layout
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

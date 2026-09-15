// ==================================
// Navbar Component
// ==================================
// Main navigation bar — sticky at the top.
// Desktop: Logo | Nav Links | Search + Cart
// Mobile:  Hamburger | Logo | Search + Cart

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SITE_NAME, NAV_LINKS } from '@/lib/constants';
import MobileMenu from '@/components/layout/MobileMenu';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { cartCount, openCart } = useCart();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-secondary border-b border-gray-200">
        <nav className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* ---- Left: Hamburger (mobile) + Logo ---- */}
            <div className="flex items-center gap-3">
              {/* Hamburger — only visible on mobile */}
              <button
                className="md:hidden p-1.5 -ml-1.5 text-primary hover:text-gray-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="text-xl md:text-2xl font-extrabold tracking-[0.08em] text-primary hover:opacity-80 transition-opacity"
              >
                {SITE_NAME}
              </Link>
            </div>

            {/* ---- Center: Nav Links (desktop only) ---- */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-[0.04em] text-primary hover:text-gray-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ---- Right: Search + Cart ---- */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-primary hover:text-gray-500 transition-colors"
                aria-label="Toggle search"
              >
                {isSearchOpen ? (
                  // Close Icon
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Search Icon
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                )}
              </button>

              {/* Cart icon */}
              <button
                onClick={openCart}
                className="relative p-2 text-primary hover:text-gray-500 transition-colors"
                aria-label="Shopping cart"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

                {/* Cart count badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-primary text-[10px] font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Dropdown */}
          <div 
            className={cn(
              "absolute left-0 right-0 bg-secondary border-b border-gray-200 overflow-hidden transition-all duration-300 ease-in-out",
              isSearchOpen ? "max-h-24 py-4" : "max-h-0 py-0 border-b-0"
            )}
          >
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto px-4 flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 px-4 border border-gray-300 focus:border-primary focus:outline-none text-sm"
              />
              <button 
                type="submit"
                className="bg-primary text-secondary px-6 h-10 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

// ==================================
// Admin Header Component
// ==================================
// Top bar for the admin portal showing the page title and user info.

'use client';

import { usePathname } from 'next/navigation';

// Map pathnames to readable page titles
function getPageTitle(pathname: string): string {
  if (pathname === '/admin') return 'Dashboard';
  if (pathname.startsWith('/admin/orders/')) return 'Order Details';
  if (pathname === '/admin/orders') return 'Orders';
  if (pathname === '/admin/products/new') return 'Add Product';
  if (pathname.startsWith('/admin/products/')) return 'Edit Product';
  if (pathname === '/admin/products') return 'Products';
  if (pathname === '/admin/customers') return 'Customers';
  if (pathname === '/admin/inventory') return 'Inventory';
  if (pathname === '/admin/discounts') return 'Discounts';
  if (pathname === '/admin/content') return 'Homepage CMS';
  if (pathname === '/admin/analytics') return 'Analytics';
  if (pathname === '/admin/settings') return 'Settings';
  return 'Admin';
}

export default function AdminHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  // Get today's date formatted nicely
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      {/* Left: Page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="text-xs text-gray-400">{today}</p>
      </div>

      {/* Right: User avatar */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          {/* Red dot indicator */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
            Z
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 leading-none">Admin</p>
            <p className="text-xs text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

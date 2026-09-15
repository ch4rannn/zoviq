// ==================================
// Admin Layout
// ==================================
// Wraps all /admin/* pages with sidebar + header.
// The storefront Navbar/Footer are NOT shown in admin pages.

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | ZOVIQ Admin',
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Sidebar — fixed on the left */}
      <AdminSidebar />

      {/* Main content area — pushed right by the sidebar width */}
      <div className="ml-64 min-h-screen bg-gray-50 flex flex-col">
        {/* Top Header */}
        <AdminHeader />

        {/* Page content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </>
  );
}

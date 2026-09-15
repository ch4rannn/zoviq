// Discounts page — coming soon placeholder
export const metadata = { title: 'Discounts' };

export default function DiscountsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Discount Management</h2>
      <p className="text-sm text-gray-500 max-w-md">
        Create and manage discount codes, automatic discounts, and track usage analytics.
        This feature will be available once the Shopify Admin API is connected.
      </p>
    </div>
  );
}

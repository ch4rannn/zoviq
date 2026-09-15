// Inventory page — coming soon placeholder
export const metadata = { title: 'Inventory' };

export default function InventoryPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Inventory Management</h2>
      <p className="text-sm text-gray-500 max-w-md">
        Track stock levels, set low-stock thresholds, and view stock adjustment history.
        This feature will be available once the Shopify Admin API is connected.
      </p>
    </div>
  );
}

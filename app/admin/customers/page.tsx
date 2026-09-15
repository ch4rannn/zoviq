// ==================================
// Admin Customers Page
// ==================================
// Lists all customers with their order history summary.

import { MOCK_CUSTOMERS } from '@/lib/mock-admin-data';

export const metadata = { title: 'Customers' };

export default function CustomersPage() {
  const customers = MOCK_CUSTOMERS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{customers.length} customers</p>
        <button className="px-4 py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          Export CSV
        </button>
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {customer.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(customer.joinedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-0.5 rounded ${
                          tag === 'VIP' ? 'bg-amber-50 text-amber-700' :
                          tag === 'first-time' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================================
// Orders List Page
// ==================================
// Shows all orders in a table with status badges and links to detail pages.

import Link from 'next/link';
import { MOCK_ORDERS } from '@/lib/mock-admin-data';
import { formatPrice } from '@/lib/utils';

export const metadata = { title: 'Orders' };

export default function OrdersPage() {
  const orders = MOCK_ORDERS;

  // Count by status
  const pendingCount = orders.filter((o) => o.fulfillmentStatus === 'unfulfilled').length;
  const fulfilledCount = orders.filter((o) => o.fulfillmentStatus === 'fulfilled').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total Orders</p>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Pending Fulfillment</p>
        </div>
        <div className="bg-white border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-emerald-600">{fulfilledCount}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Fulfilled</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="text-sm font-semibold text-gray-900 hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.itemCount} item{order.itemCount > 1 ? 's' : ''}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' :
                      order.paymentStatus === 'pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.fulfillmentStatus === 'fulfilled' ? 'bg-emerald-50 text-emerald-700' :
                      order.fulfillmentStatus === 'unfulfilled' ? 'bg-amber-50 text-amber-700' :
                      order.fulfillmentStatus === 'cancelled' ? 'bg-red-50 text-red-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-xs font-medium text-gray-500 hover:text-gray-900 underline underline-offset-4 transition-colors"
                    >
                      View
                    </Link>
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

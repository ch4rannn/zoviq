// ==================================
// Admin Dashboard Page
// ==================================
// The main admin landing page showing business KPIs at a glance.

import StatCard from '@/components/admin/StatCard';
import {
  MOCK_DASHBOARD_STATS,
  MOCK_REVENUE_CHART,
  MOCK_TOP_PRODUCTS,
  MOCK_ORDERS,
} from '@/lib/mock-admin-data';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = MOCK_DASHBOARD_STATS;
  const recentOrders = MOCK_ORDERS.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* ---- Stat Cards ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Revenue"
          value={`₹${stats.todayRevenue}`}
          trend="up"
          trendValue="+12% vs yesterday"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
          }
        />
        <StatCard
          title="Today's Orders"
          value={stats.todayOrders.toString()}
          subtitle={`${stats.weekOrders} this week`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          }
        />
        <StatCard
          title="Pending Fulfillment"
          value={stats.pendingOrders.toString()}
          subtitle="Need to ship"
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          }
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStockCount.toString()}
          subtitle="Products need restock"
          trend={stats.lowStockCount > 0 ? 'down' : 'neutral'}
          trendValue={stats.lowStockCount > 0 ? 'Action needed' : ''}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          }
        />
      </div>

      {/* ---- Charts Row ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
            Revenue — Last 7 Days
          </h3>
          <div className="flex items-end gap-3 h-48">
            {MOCK_REVENUE_CHART.map((item) => {
              const maxRevenue = Math.max(...MOCK_REVENUE_CHART.map((d) => d.revenue));
              const heightPercent = (item.revenue / maxRevenue) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">
                    ₹{(item.revenue / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full bg-gray-900 rounded-t-md transition-all hover:bg-amber-500"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs text-gray-400">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
            Top Products
          </h3>
          <ul className="space-y-4">
            {MOCK_TOP_PRODUCTS.map((product, index) => {
              const maxSold = MOCK_TOP_PRODUCTS[0].sold;
              const widthPercent = (product.sold / maxSold) * 100;
              return (
                <li key={index}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700 truncate pr-4">{product.name}</span>
                    <span className="text-sm font-semibold text-gray-900">{product.sold}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---- Recent Orders ---- */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Recent Orders
          </h3>
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id}`} className="text-sm font-medium text-gray-900 hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(order.total)}</td>
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
                      'bg-red-50 text-red-700'
                    }`}>
                      {order.fulfillmentStatus}
                    </span>
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

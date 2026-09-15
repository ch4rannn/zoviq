// ==================================
// Order Detail Page
// ==================================
// Shows full details for a single order.

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_ORDERS } from '@/lib/mock-admin-data';
import { formatPrice } from '@/lib/utils';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = await params;
  const order = MOCK_ORDERS.find((o) => o.id === resolvedParams.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/admin/orders" className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back to Orders
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h2>
          <p className="text-sm text-gray-500">
            {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="flex gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            order.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-700' :
            order.paymentStatus === 'pending' ? 'bg-amber-50 text-amber-700' :
            'bg-red-50 text-red-700'
          }`}>
            Payment: {order.paymentStatus}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            order.fulfillmentStatus === 'fulfilled' ? 'bg-emerald-50 text-emerald-700' :
            order.fulfillmentStatus === 'unfulfilled' ? 'bg-amber-50 text-amber-700' :
            'bg-red-50 text-red-700'
          }`}>
            {order.fulfillmentStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Items ({order.itemCount})
            </h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {order.items.map((item, index) => (
              <li key={index} className="flex items-center gap-4 p-6">
                <div className="relative w-16 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price)}</p>
              </li>
            ))}
          </ul>
          {/* Totals */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Subtotal</span>
              <span className="text-sm text-gray-900">{formatPrice(order.total)}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-gray-600">Shipping</span>
              <span className="text-sm text-emerald-600">Free</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-base font-bold text-gray-900">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar: Customer + Shipping */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Customer</h3>
            <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
            <p className="text-sm text-gray-500">{order.customerEmail}</p>
          </div>

          {/* Shipping */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Shipping Address</h3>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.line1}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p className="text-gray-400 mt-2">{order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Actions</h3>
            <div className="space-y-3">
              {order.fulfillmentStatus === 'unfulfilled' && (
                <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                  Mark as Fulfilled
                </button>
              )}
              <button className="w-full py-2.5 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                Print Invoice
              </button>
              {order.paymentStatus === 'paid' && order.fulfillmentStatus !== 'cancelled' && (
                <button className="w-full py-2.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors">
                  Issue Refund
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// REQUIRED for static export
export function generateStaticParams() {
  return MOCK_ORDERS.map((order) => ({
    id: order.id,
  }));
}

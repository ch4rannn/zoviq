// ==================================
// Admin Products Page
// ==================================
// Shows all products in a table with stock, price, and status.

import Image from 'next/image';
import Link from 'next/link';
import { MOCK_ADMIN_PRODUCTS } from '@/lib/mock-admin-data';
import { formatPrice } from '@/lib/utils';

export const metadata = { title: 'Products' };

export default function ProductsPage() {
  const products = MOCK_ADMIN_PRODUCTS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{products.length} products</p>
        <button className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
          + Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Compare At</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <Image src={product.image} alt={product.title} fill sizes="48px" className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.title}</p>
                        <p className="text-xs text-gray-400">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </span>
                    {product.stock <= 5 && (
                      <span className="ml-2 text-xs text-red-500">Low!</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                      product.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
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

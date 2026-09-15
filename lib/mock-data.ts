// ==================================
// Mock Product Data
// ==================================
// This data is used ONLY during development before Shopify is connected.
// Once you add your Shopify credentials to .env.local, replace these
// mock calls with real Shopify API calls.
//
// The data shape matches our Shopify types exactly, so swapping is seamless.

import type { Product } from '@/types/shopify';

/**
 * Mock products for development.
 * These mimic what Shopify's Storefront API would return.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    title: 'Oversized Essential Tee — Black',
    handle: 'oversized-essential-tee-black',
    description: 'Premium 240 GSM cotton oversized t-shirt. Dropped shoulders, relaxed fit.',
    descriptionHtml: '<p>Premium 240 GSM cotton oversized t-shirt. Dropped shoulders, relaxed fit.</p>',
    priceRange: {
      minVariantPrice: { amount: '799.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '799.00', currencyCode: 'INR' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
    },
    images: [
      {
        url: '/images/product-1.jpg',
        altText: 'Oversized Essential Tee in Black',
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: 'variant-1-s',
        title: 'S',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'S' }],
      },
      {
        id: 'variant-1-m',
        title: 'M',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'M' }],
      },
      {
        id: 'variant-1-l',
        title: 'L',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'L' }],
      },
      {
        id: 'variant-1-xl',
        title: 'XL',
        availableForSale: false,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'XL' }],
      },
    ],
    options: [{ id: 'opt-1', name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    availableForSale: true,
    tags: ['oversized', 'essential', 'new'],
    productType: 'T-Shirt',
    vendor: 'ZOVIQ',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'mock-2',
    title: 'Oversized Essential Tee — White',
    handle: 'oversized-essential-tee-white',
    description: 'Premium 240 GSM cotton oversized t-shirt. Clean white, relaxed fit.',
    descriptionHtml: '<p>Premium 240 GSM cotton oversized t-shirt. Clean white, relaxed fit.</p>',
    priceRange: {
      minVariantPrice: { amount: '799.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '799.00', currencyCode: 'INR' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
    },
    images: [
      {
        url: '/images/product-2.jpg',
        altText: 'Oversized Essential Tee in White',
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: 'variant-2-s',
        title: 'S',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'S' }],
      },
      {
        id: 'variant-2-m',
        title: 'M',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'M' }],
      },
      {
        id: 'variant-2-l',
        title: 'L',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'L' }],
      },
    ],
    options: [{ id: 'opt-2', name: 'Size', values: ['S', 'M', 'L'] }],
    availableForSale: true,
    tags: ['oversized', 'essential', 'bestseller'],
    productType: 'T-Shirt',
    vendor: 'ZOVIQ',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'mock-3',
    title: 'Geometric Graphic Tee — Charcoal',
    handle: 'geometric-graphic-tee-charcoal',
    description: 'Abstract geometric print on premium 220 GSM cotton. Statement piece.',
    descriptionHtml: '<p>Abstract geometric print on premium 220 GSM cotton. Statement piece.</p>',
    priceRange: {
      minVariantPrice: { amount: '899.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '899.00', currencyCode: 'INR' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '1499.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1499.00', currencyCode: 'INR' },
    },
    images: [
      {
        url: '/images/product-3.jpg',
        altText: 'Geometric Graphic Tee in Charcoal',
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: 'variant-3-m',
        title: 'M',
        availableForSale: true,
        price: { amount: '899.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1499.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'M' }],
      },
      {
        id: 'variant-3-l',
        title: 'L',
        availableForSale: true,
        price: { amount: '899.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1499.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'L' }],
      },
      {
        id: 'variant-3-xl',
        title: 'XL',
        availableForSale: true,
        price: { amount: '899.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1499.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'XL' }],
      },
    ],
    options: [{ id: 'opt-3', name: 'Size', values: ['M', 'L', 'XL'] }],
    availableForSale: true,
    tags: ['graphic', 'new'],
    productType: 'T-Shirt',
    vendor: 'ZOVIQ',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'mock-4',
    title: 'Oversized Essential Tee — Sand',
    handle: 'oversized-essential-tee-sand',
    description: 'Warm sand tone, premium 240 GSM cotton. Dropped shoulders, relaxed fit.',
    descriptionHtml: '<p>Warm sand tone, premium 240 GSM cotton. Dropped shoulders, relaxed fit.</p>',
    priceRange: {
      minVariantPrice: { amount: '799.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '799.00', currencyCode: 'INR' },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
      maxVariantPrice: { amount: '1299.00', currencyCode: 'INR' },
    },
    images: [
      {
        url: '/images/product-4.jpg',
        altText: 'Oversized Essential Tee in Sand',
        width: 800,
        height: 1067,
      },
    ],
    variants: [
      {
        id: 'variant-4-s',
        title: 'S',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'S' }],
      },
      {
        id: 'variant-4-m',
        title: 'M',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'M' }],
      },
      {
        id: 'variant-4-l',
        title: 'L',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'L' }],
      },
      {
        id: 'variant-4-xl',
        title: 'XL',
        availableForSale: true,
        price: { amount: '799.00', currencyCode: 'INR' },
        compareAtPrice: { amount: '1299.00', currencyCode: 'INR' },
        selectedOptions: [{ name: 'Size', value: 'XL' }],
      },
    ],
    options: [{ id: 'opt-4', name: 'Size', values: ['S', 'M', 'L', 'XL'] }],
    availableForSale: true,
    tags: ['oversized', 'essential', 'bestseller'],
    productType: 'T-Shirt',
    vendor: 'ZOVIQ',
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
];

/** Get mock products tagged as "new" */
export function getMockNewArrivals(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.tags.includes('new'));
}

/** Get mock products tagged as "bestseller" */
export function getMockBestSellers(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.tags.includes('bestseller'));
}

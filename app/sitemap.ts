// ==================================
// Sitemap Generator
// ==================================
// Generates sitemap.xml at build time.
// Google and other search engines use this to discover all pages.

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/collection/new-arrivals`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collection/best-sellers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/collection/all`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  // Product pages
  const productPages: MetadataRoute.Sitemap = MOCK_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.handle}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}

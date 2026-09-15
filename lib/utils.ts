// ==================================
// Utility Functions
// ==================================
// Small helper functions used across the app.

import { CURRENCY_SYMBOL } from '@/lib/constants';

/**
 * Formats a price string from Shopify into a readable format.
 * Shopify returns prices as strings like "799.00".
 *
 * @param amount - The price amount as a string (e.g., "799.00")
 * @returns Formatted price string (e.g., "₹799")
 *
 * @example
 * formatPrice("799.00") → "₹799"
 * formatPrice("1299.50") → "₹1,300"
 */
export function formatPrice(amount: string): string {
  const numericAmount = parseFloat(amount);

  // Use Indian numbering system (e.g., 1,00,000 instead of 100,000)
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0, // No decimal places for INR
  }).format(numericAmount);

  return `${CURRENCY_SYMBOL}${formatted}`;
}

/**
 * Calculates the discount percentage between two prices.
 *
 * @param originalPrice - The original/compare-at price
 * @param salePrice - The current sale price
 * @returns Discount percentage as a whole number (e.g., 38)
 *
 * @example
 * getDiscountPercentage("1299.00", "799.00") → 38
 */
export function getDiscountPercentage(
  originalPrice: string,
  salePrice: string
): number {
  const original = parseFloat(originalPrice);
  const sale = parseFloat(salePrice);

  if (original <= 0 || sale >= original) return 0;

  return Math.round(((original - sale) / original) * 100);
}

/**
 * Creates a URL-friendly slug from a string.
 *
 * @param text - The text to convert
 * @returns URL-friendly slug
 *
 * @example
 * slugify("Oversized Black Tee") → "oversized-black-tee"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Remove consecutive hyphens
}

/**
 * Truncates text to a maximum length, adding "..." if truncated.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated text
 *
 * @example
 * truncate("A very long description here", 20) → "A very long descript..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Joins class names together, filtering out falsy values.
 * A simple alternative to the `clsx` library.
 *
 * @param classes - Class names (strings, undefined, null, or false)
 * @returns Combined class string
 *
 * @example
 * cn("text-lg", isActive && "font-bold", undefined) → "text-lg font-bold"
 */
export function cn(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(' ');
}

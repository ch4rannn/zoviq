// ==================================
// Shopify Storefront API Types
// ==================================
// These types represent the data we get back from Shopify.
// They match the shape of GraphQL responses from the Storefront API.

/**
 * Money — represents a price amount with currency.
 * Shopify returns amounts as strings (e.g., "799.00").
 */
export interface Money {
  amount: string;
  currencyCode: string;
}

/**
 * Price range for a product (min and max variant prices).
 * Useful for displaying "From ₹799" on product cards.
 */
export interface PriceRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}

/**
 * Image from Shopify CDN.
 * Includes dimensions for proper aspect ratio rendering.
 */
export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

/**
 * A selected option on a variant (e.g., { name: "Size", value: "L" }).
 * Products can have up to 3 options (usually Size, Color, Material).
 */
export interface SelectedOption {
  name: string;
  value: string;
}

/**
 * Product variant — a specific combination of options.
 * For example: "Black / Large" is one variant of a T-shirt.
 * Each variant has its own price, availability, and inventory.
 */
export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null; // Original price (before discount), null if no discount
  selectedOptions: SelectedOption[];
}

/**
 * Product option — defines what options exist for a product.
 * Example: { name: "Size", values: ["S", "M", "L", "XL"] }
 */
export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

/**
 * Full product data from Shopify.
 * This is what we get when fetching a product by handle.
 */
export interface Product {
  id: string;
  title: string;
  handle: string; // URL-friendly slug (e.g., "oversized-black-tee")
  description: string;
  descriptionHtml: string;
  priceRange: PriceRange;
  compareAtPriceRange: PriceRange;
  images: ShopifyImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Collection — a group of products (e.g., "Oversized Tees", "New Arrivals").
 * Created and managed in Shopify Admin.
 */
export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
}

/**
 * Collection with its products included.
 * Used on collection pages (e.g., /collection/oversized-tees).
 */
export interface CollectionWithProducts extends Collection {
  products: Product[];
}

// ==================================
// Cart Types
// ==================================

/**
 * The merchandise (product variant) inside a cart line.
 * Includes enough product info to display in the cart drawer.
 */
export interface CartMerchandise {
  id: string;
  title: string;
  selectedOptions: SelectedOption[];
  product: {
    title: string;
    handle: string;
    images: ShopifyImage[];
  };
}

/**
 * A single line item in the cart.
 * One line = one product variant × quantity.
 */
export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: CartMerchandise;
}

/**
 * Cart cost breakdown from Shopify.
 */
export interface CartCost {
  subtotalAmount: Money;
  totalAmount: Money;
  totalTaxAmount: Money | null;
}

/**
 * The full shopping cart.
 * Created and managed through Shopify's Storefront API.
 * The checkoutUrl redirects to Shopify's hosted checkout.
 */
export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: CartCost;
  lines: CartLine[];
}

// ==================================
// Input Types (for mutations)
// ==================================

/**
 * Input for adding items to cart.
 * merchandiseId is the variant ID (not the product ID).
 */
export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

/**
 * Input for updating cart line quantities.
 * lineId is the cart line ID (not the variant ID).
 */
export interface CartLineUpdateInput {
  id: string;
  quantity: number;
}

// ==================================
// API Response Types
// ==================================

/**
 * Shopify GraphQL responses wrap data in "edges" and "nodes".
 * These helper types make it easier to work with that structure.
 */
export interface ShopifyEdge<T> {
  node: T;
}

export interface ShopifyConnection<T> {
  edges: ShopifyEdge<T>[];
}

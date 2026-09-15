// ==================================
// Shopify Storefront API Client
// ==================================
// This file handles ALL communication with Shopify.
// Every function fetches data from or sends data to Shopify's Storefront API.
//
// HOW IT WORKS:
// 1. We send GraphQL queries to Shopify's API endpoint
// 2. Shopify returns JSON data
// 3. We transform the data into our TypeScript types
// 4. Components use these functions to get/send data

import type {
  Product,
  Collection,
  CollectionWithProducts,
  Cart,
  CartLineInput,
  CartLineUpdateInput,
  ShopifyConnection,
} from '@/types/shopify';

// ------------------------------------
// Configuration
// ------------------------------------

// These come from .env.local — see .env.example for setup instructions
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-01';

// The URL we send all GraphQL requests to
const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

// ------------------------------------
// Base Fetch Function
// ------------------------------------

/**
 * Sends a GraphQL request to Shopify's Storefront API.
 * All other functions in this file use this as their foundation.
 *
 * @param query - The GraphQL query string
 * @param variables - Optional variables for the query
 * @returns The parsed JSON response data
 */
async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `Shopify API error: ${response.status} ${response.statusText}`
    );
  }

  const json = await response.json();

  // Shopify returns errors inside the JSON body (not as HTTP errors)
  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'Unknown Shopify API error');
  }

  return json.data;
}

// ------------------------------------
// Helper: Transform Shopify Response
// ------------------------------------

/**
 * Shopify wraps lists in "edges" → "node" structure.
 * This helper flattens that into a simple array.
 *
 * Example: { edges: [{ node: product1 }, { node: product2 }] }
 * Becomes: [product1, product2]
 */
function flattenConnection<T>(connection: ShopifyConnection<T>): T[] {
  return connection.edges.map((edge) => edge.node);
}

/**
 * Transforms a raw Shopify product response into our Product type.
 * Flattens the nested edges/nodes for images and variants.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reshapeProduct(product: any): Product {
  return {
    ...product,
    images: flattenConnection(product.images),
    variants: flattenConnection(product.variants),
  };
}

/**
 * Transforms a raw Shopify cart response into our Cart type.
 * Flattens the cart lines from edges/nodes.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reshapeCart(cart: any): Cart {
  return {
    ...cart,
    lines: flattenConnection(cart.lines),
  };
}

// ------------------------------------
// GraphQL Fragments
// ------------------------------------
// Fragments are reusable pieces of GraphQL queries.
// We define them once and use them in multiple queries.

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    tags
    productType
    vendor
    createdAt
    updatedAt
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ------------------------------------
// Product Functions
// ------------------------------------

/**
 * Fetches a list of products from Shopify.
 *
 * @param first - How many products to fetch (default: 20)
 * @param sortKey - How to sort: TITLE, PRICE, BEST_SELLING, CREATED_AT
 * @param reverse - Reverse the sort order
 * @param query - Optional search/filter query
 * @returns Array of Product objects
 */
export async function getProducts({
  first = 20,
  sortKey = 'CREATED_AT',
  reverse = true,
  query = '',
}: {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
} = {}): Promise<Product[]> {
  const graphqlQuery = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: ShopifyConnection<Product>;
  }>(graphqlQuery, { first, sortKey, reverse, query });

  return flattenConnection(data.products).map(reshapeProduct);
}

/**
 * Fetches a single product by its handle (URL slug).
 *
 * @param handle - The product handle (e.g., "oversized-black-tee")
 * @returns The Product object, or null if not found
 */
export async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch<{ product: Product | null }>(query, {
    handle,
  });

  if (!data.product) return null;

  return reshapeProduct(data.product);
}

/**
 * Searches products by keyword.
 *
 * @param searchQuery - The search term (e.g., "black tee")
 * @returns Array of matching Product objects
 */
export async function searchProducts(
  searchQuery: string
): Promise<Product[]> {
  return getProducts({ query: searchQuery, first: 20 });
}

// ------------------------------------
// Collection Functions
// ------------------------------------

/**
 * Fetches all collections from Shopify.
 *
 * @returns Array of Collection objects
 */
export async function getCollections(): Promise<Collection[]> {
  const query = `
    query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collections: ShopifyConnection<Collection>;
  }>(query);

  return flattenConnection(data.collections);
}

/**
 * Fetches a single collection with its products.
 *
 * @param handle - The collection handle (e.g., "oversized-tees")
 * @returns The CollectionWithProducts object, or null if not found
 */
export async function getCollection(
  handle: string
): Promise<CollectionWithProducts | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        image {
          url
          altText
          width
          height
        }
        products(first: 50) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collection: (Collection & { products: ShopifyConnection<Product> }) | null;
  }>(query, { handle });

  if (!data.collection) return null;

  return {
    ...data.collection,
    products: flattenConnection(data.collection.products).map(reshapeProduct),
  };
}

// ------------------------------------
// Cart Functions
// ------------------------------------

/**
 * Creates a new shopping cart in Shopify.
 * Optionally adds initial items.
 *
 * @param lines - Optional items to add immediately
 * @returns The new Cart object (includes checkoutUrl)
 */
export async function createCart(
  lines: CartLineInput[] = []
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: { cart: Cart };
  }>(query, { lines });

  return reshapeCart(data.cartCreate.cart);
}

/**
 * Adds items to an existing cart.
 *
 * @param cartId - The cart ID
 * @param lines - Items to add (variant ID + quantity)
 * @returns Updated Cart object
 */
export async function addToCart(
  cartId: string,
  lines: CartLineInput[]
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: Cart };
  }>(query, { cartId, lines });

  return reshapeCart(data.cartLinesAdd.cart);
}

/**
 * Updates the quantity of items already in the cart.
 *
 * @param cartId - The cart ID
 * @param lines - Items to update (line ID + new quantity)
 * @returns Updated Cart object
 */
export async function updateCart(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: Cart };
  }>(query, { cartId, lines });

  return reshapeCart(data.cartLinesUpdate.cart);
}

/**
 * Removes items from the cart.
 *
 * @param cartId - The cart ID
 * @param lineIds - IDs of the cart lines to remove
 * @returns Updated Cart object
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: { cart: Cart };
  }>(query, { cartId, lineIds });

  return reshapeCart(data.cartLinesRemove.cart);
}

/**
 * Fetches an existing cart by its ID.
 * Returns null if the cart has expired or doesn't exist.
 *
 * @param cartId - The cart ID (stored in localStorage)
 * @returns Cart object or null
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  const data = await shopifyFetch<{ cart: Cart | null }>(query, { cartId });

  if (!data.cart) return null;

  return reshapeCart(data.cart);
}

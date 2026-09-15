# 02 — ZOVIQ Technical Architecture

## Architecture Overview

```
┌─────────────────────┐
│   User's Browser     │
│   (Mobile / Desktop) │
└─────────┬───────────┘
          │ HTTPS
          ▼
┌─────────────────────┐
│   Next.js Frontend   │
│   (Vercel)           │
│                      │
│  • Server Components │
│  • Client Components │
│  • API Routes        │
└─────────┬───────────┘
          │ GraphQL (Storefront API)
          ▼
┌─────────────────────┐
│   Shopify            │
│                      │
│  • Products          │
│  • Collections       │
│  • Cart              │
│  • Checkout          │
│  • Payments          │
│  • Orders            │
│  • Customers         │
└─────────────────────┘
```

### How Each Layer Works

| Layer | What It Does |
|---|---|
| **User's Browser** | Renders the website. Users browse products, add to cart, and checkout. |
| **Next.js Frontend** | Our custom storefront. Server components fetch data from Shopify at build/request time. Client components handle interactivity (cart, filters, etc.). Hosted on Vercel. |
| **Shopify Storefront API** | A GraphQL API that gives us read access to products, collections, and write access to carts. This is the ONLY way our frontend talks to Shopify. |
| **Shopify** | Manages everything: products, inventory, orders, payments, customer data. We never build our own versions of these. |

### Why This Architecture?

- **Simple**: Only two systems — our Next.js app and Shopify. No custom backend, no database, no auth system to maintain.
- **Secure**: Shopify handles all payments and sensitive data. We never touch credit card numbers.
- **Scalable**: Shopify handles traffic spikes, inventory, and order processing. Vercel handles frontend scaling automatically.
- **Beginner-friendly**: We only write frontend code. Shopify does the heavy lifting.

---

## Folder Structure

```
zoviq/
├── app/                          # Next.js App Router (all pages live here)
│   ├── layout.tsx                # Root layout — wraps every page with Navbar + Footer
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── not-found.tsx             # Custom 404 page
│   ├── error.tsx                 # Global error boundary
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # robots.txt configuration
│   ├── shop/
│   │   └── page.tsx              # Shop All page
│   ├── collection/
│   │   └── [slug]/
│   │       └── page.tsx          # Collection page (dynamic route)
│   ├── product/
│   │   └── [handle]/
│   │       └── page.tsx          # Product detail page (dynamic route)
│   ├── search/
│   │   └── page.tsx              # Search results page
│   ├── cart/
│   │   └── page.tsx              # Full cart page
│   ├── checkout/
│   │   └── page.tsx              # Checkout redirect page
│   ├── order-success/
│   │   └── page.tsx              # Order confirmation page
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── shipping/
│   │   └── page.tsx              # Shipping policy
│   ├── returns/
│   │   └── page.tsx              # Returns policy
│   ├── privacy/
│   │   └── page.tsx              # Privacy policy
│   └── terms/
│       └── page.tsx              # Terms & conditions
│
├── components/                   # All reusable components
│   ├── layout/                   # Layout components (Navbar, Footer, etc.)
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── AnnouncementBar.tsx
│   │   └── Footer.tsx
│   ├── home/                     # Homepage section components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedCollection.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── BrandStatement.tsx
│   │   ├── BestSellers.tsx
│   │   ├── LifestyleBanner.tsx
│   │   ├── SocialSection.tsx
│   │   └── Newsletter.tsx
│   ├── product/                  # Product-related components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductImageGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── ColorSelector.tsx
│   │   ├── QuantitySelector.tsx
│   │   ├── AddToCartButton.tsx
│   │   ├── PriceDisplay.tsx
│   │   └── SizeGuide.tsx
│   ├── cart/                     # Cart components
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── shop/                     # Shop/filter components
│   │   ├── FilterBar.tsx
│   │   └── SearchBar.tsx
│   └── ui/                       # Generic UI components
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── LoadingSpinner.tsx
│       ├── SkeletonCard.tsx
│       ├── ErrorMessage.tsx
│       ├── Breadcrumb.tsx
│       └── SizeGuideModal.tsx
│
├── context/                      # React Context providers
│   └── CartContext.tsx            # Cart state management
│
├── lib/                          # Utility functions and API clients
│   ├── shopify.ts                # Shopify Storefront API client + all queries
│   ├── constants.ts              # Site-wide constants (site name, nav links, etc.)
│   └── utils.ts                  # Helper functions (price formatting, etc.)
│
├── types/                        # TypeScript type definitions
│   └── shopify.ts                # Types for Shopify data (Product, Collection, Cart, etc.)
│
├── public/                       # Static files (images, fonts, favicon)
│   ├── images/
│   └── fonts/
│
├── .env.local                    # Environment variables (NEVER commit this)
├── .env.example                  # Example env file (safe to commit)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### What Each Folder Does

| Folder | Purpose |
|---|---|
| `app/` | All pages. Next.js App Router uses file-based routing — each folder becomes a URL. |
| `components/` | Reusable UI pieces. Organized by feature (layout, home, product, cart, shop, ui). |
| `context/` | React Context for global state. We only need one: `CartContext` for cart management. |
| `lib/` | Non-component code: API client, helper functions, constants. |
| `types/` | TypeScript interfaces/types. Keeps our data shapes well-defined. |
| `public/` | Static assets served directly (images, favicon, fonts). |

---

## Shopify Integration

### Shopify Storefront API

The Storefront API is a **GraphQL API** provided by Shopify. It lets us:
- **Read** products, collections, and product variants
- **Create and manage** shopping carts
- **Generate** checkout URLs

It does NOT let us:
- Manage inventory (that's done in Shopify Admin)
- Process payments (that's Shopify Checkout)
- Access order details after purchase (that's the Admin API)

### Authentication

Shopify gives us a **Storefront Access Token**. This token:
- Is safe to use in the browser (it's a public token with limited permissions)
- Only allows read access to products and write access to carts
- Cannot modify products, prices, or inventory

> **Important**: The Storefront Access Token is different from the Admin API key. The Admin API key is PRIVATE and must NEVER be in frontend code.

### What We Can Do With the Storefront API

| Operation | API Action | Where It Runs |
|---|---|---|
| Fetch all products | `products` query | Server component (at build/request time) |
| Fetch single product | `product` query | Server component |
| Fetch collection | `collection` query | Server component |
| Search products | `products` query with search filter | Server component |
| Create a cart | `cartCreate` mutation | Client component (on user action) |
| Add item to cart | `cartLinesAdd` mutation | Client component |
| Update cart item | `cartLinesUpdate` mutation | Client component |
| Remove cart item | `cartLinesRemove` mutation | Client component |
| Get checkout URL | Read `checkoutUrl` from cart | Client component |

### Server vs Client Operations

**Server Components** (run on the server, no JavaScript sent to browser):
- Fetching product lists
- Fetching product details
- Fetching collections
- Search results
- SEO metadata generation

**Client Components** (run in the browser, interactive):
- Cart operations (add, update, remove)
- Cart drawer UI
- Size/color selection
- Quantity changes
- Search input
- Filter controls

**Why this split?**
- Server components are faster — data is fetched before the page reaches the browser
- Client components are needed for interactivity — things the user clicks/types
- This is a core Next.js concept and keeps our app performant

---

## Data Flow

### 1. Product Loading

```
User visits /shop
  → Next.js server component runs
  → Calls Shopify Storefront API: products query
  → Receives product data (name, price, images, variants)
  → Renders ProductGrid with ProductCards
  → HTML sent to browser (fast, SEO-friendly)
```

### 2. Product Selection (Detail Page)

```
User clicks a ProductCard
  → Navigates to /product/[handle]
  → Next.js server component runs
  → Calls Shopify: product query with handle
  → Receives full product data (all images, all variants, description)
  → Renders product page
  → Client components (SizeSelector, ColorSelector) become interactive
```

### 3. Add to Cart

```
User clicks "Add to Cart"
  → Client component reads selected variant ID + quantity
  → Checks if cart exists in CartContext
    → If no cart: calls cartCreate mutation → stores cart ID in localStorage
    → If cart exists: calls cartLinesAdd mutation
  → CartContext updates with new cart data
  → CartDrawer opens showing the added item
```

### 4. Update Cart

```
User changes quantity in CartDrawer
  → Client calls cartLinesUpdate mutation with new quantity
  → CartContext updates
  → UI re-renders with new quantity + subtotal
```

### 5. Remove from Cart

```
User clicks remove button on a CartItem
  → Client calls cartLinesRemove mutation
  → CartContext updates
  → Item disappears from cart
```

### 6. Checkout

```
User clicks "Checkout" in CartDrawer
  → Read checkoutUrl from cart data
  → Redirect user to Shopify's hosted checkout page
  → User fills in shipping details on Shopify
  → User selects payment method (UPI / COD / Card)
  → Shopify processes payment
  → Shopify redirects to our /order-success page
  → Clear cart from localStorage
  → Show thank-you message
```

---

## API Design

All Shopify API calls live in `lib/shopify.ts`. Here's every function we need:

### Core API Client

```typescript
// lib/shopify.ts

// Base function to make GraphQL requests to Shopify
async function shopifyFetch<T>(query: string, variables?: object): Promise<T>
```

### Product Functions

```typescript
// Get all products (with optional pagination)
async function getProducts(first?: number): Promise<Product[]>
// Input: first (number of products to fetch, default 20)
// Output: Array of Product objects

// Get a single product by its handle (URL slug)
async function getProduct(handle: string): Promise<Product | null>
// Input: handle (e.g., "oversized-black-tee")
// Output: Full Product object with all variants, images, description

// Search products by keyword
async function searchProducts(query: string): Promise<Product[]>
// Input: query (search string, e.g., "black tee")
// Output: Array of matching Product objects
```

### Collection Functions

```typescript
// Get all collections
async function getCollections(): Promise<Collection[]>
// Output: Array of Collection objects (name, slug, image)

// Get a single collection with its products
async function getCollection(handle: string): Promise<CollectionWithProducts | null>
// Input: handle (e.g., "oversized-tees")
// Output: Collection object with nested products array
```

### Cart Functions

```typescript
// Create a new empty cart (or with initial items)
async function createCart(lines?: CartLine[]): Promise<Cart>
// Input: optional array of { variantId, quantity }
// Output: Cart object with id, checkoutUrl, lines

// Add items to an existing cart
async function addToCart(cartId: string, lines: CartLine[]): Promise<Cart>
// Input: cartId, array of { variantId, quantity }
// Output: Updated Cart object

// Update item quantity in cart
async function updateCart(cartId: string, lines: CartLineUpdate[]): Promise<Cart>
// Input: cartId, array of { lineId, quantity }
// Output: Updated Cart object

// Remove items from cart
async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart>
// Input: cartId, array of line item IDs to remove
// Output: Updated Cart object

// Get an existing cart by its ID
async function getCart(cartId: string): Promise<Cart | null>
// Input: cartId
// Output: Cart object (or null if expired/not found)
```

### Checkout

```typescript
// The checkout URL comes from the Cart object itself
// No separate function needed — just read cart.checkoutUrl
```

---

## Error Handling

### Error Scenarios and Responses

| Scenario | What We Do | User Sees |
|---|---|---|
| **Shopify API fails** (network error, 500) | Catch the error, log it, show fallback UI | "Something went wrong. Please try again." with a retry button |
| **Product doesn't exist** (invalid handle) | `getProduct()` returns null | Next.js `notFound()` → custom 404 page: "Product not found" |
| **Variant is unavailable** (out of stock) | Check `availableForSale` on each variant | Variant button is greyed out + "Sold Out" label |
| **Product goes out of stock** (after page load) | Shopify will reject `cartLinesAdd` | "This item is currently out of stock" toast/alert |
| **Cart expires** (~10 days of inactivity) | `getCart()` returns null | Silently create a new cart; user sees empty cart |
| **Checkout fails** | Shopify handles this on their checkout page | Shopify's own error UI (we don't control this) |
| **Internet connection fails** | Fetch throws a network error | "Please check your internet connection and try again." |
| **Rate limiting** (too many API calls) | Shopify returns 429 | Implement basic retry with delay (rare for storefronts) |

### Error Handling Pattern

```typescript
// Every API call follows this pattern:
try {
  const data = await shopifyFetch(query, variables);
  return data;
} catch (error) {
  console.error('Shopify API Error:', error);
  // Either throw to let the error boundary catch it,
  // or return a fallback value
  throw error;
}
```

### Error Boundaries

- `app/error.tsx` — Global error boundary for unhandled errors
- `app/not-found.tsx` — Custom 404 page
- Individual components show inline error messages when appropriate

---

## Security

### Rules for Beginners

1. **Never expose secrets in frontend code**
   - The Shopify Admin API key is SECRET — never use it in `lib/shopify.ts`
   - Only the Storefront Access Token goes in the frontend
   - Even so, prefix it with `NEXT_PUBLIC_` since it's a public token

2. **Use environment variables**
   - Store all API keys in `.env.local`
   - Never hardcode tokens in source files
   - Add `.env.local` to `.gitignore`

3. **Never trust client-side prices**
   - Product prices come from Shopify, not from our code
   - We DISPLAY prices but never CALCULATE them
   - Shopify calculates totals during checkout

4. **Never process card information**
   - Shopify Checkout handles all payment processing
   - We redirect users to Shopify — we never see card numbers
   - This keeps us PCI-compliant without any effort

5. **Validate user input**
   - Sanitize search queries before sending to Shopify
   - Validate quantity is a positive integer
   - Validate variant IDs exist before adding to cart

6. **Never commit `.env` files**
   - `.env.local` is in `.gitignore` by default
   - Provide `.env.example` with empty values for reference

7. **Use HTTPS everywhere**
   - Vercel provides free SSL automatically
   - Shopify API uses HTTPS by default

---

## Environment Variables

### `.env.example` (safe to commit)

```env
# Shopify Store Domain
# Example: your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=

# Shopify Storefront API Access Token
# Get this from: Shopify Admin → Settings → Apps → Develop apps → Storefront API
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=

# Storefront API Version
# Using a specific version ensures our queries don't break when Shopify updates
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

### `.env.local` (NEVER commit this)

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=zoviq.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-actual-token-here
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
```

### Variable Explanation

| Variable | Public? | Why? |
|---|---|---|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Yes | Needed in browser to make API calls. The domain itself isn't secret. |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Yes | This is a PUBLIC token with limited permissions. Shopify designed it to be used in frontends. |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | Yes | Just a version string, not sensitive. |

> **Why `NEXT_PUBLIC_` prefix?**
> In Next.js, environment variables are only available on the server by default. Adding `NEXT_PUBLIC_` makes them available in the browser too. We need this because cart operations happen in client components.

> **What about private variables?**
> If we later add server-side features (like the Shopify Admin API for order webhooks), those keys will NOT have the `NEXT_PUBLIC_` prefix and will only be accessible in server-side code.

---

## SEO Strategy

### Metadata

Every page gets a `metadata` export (Next.js built-in feature):

```typescript
// Example: app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'ZOVIQ — Premium Streetwear',
    template: '%s | ZOVIQ',
  },
  description: 'Shop premium Gen-Z streetwear. Oversized tees, graphic tees, and more.',
};
```

### Page-Specific Metadata

| Page | Title | Description |
|---|---|---|
| `/` | ZOVIQ — Premium Streetwear | Shop premium Gen-Z streetwear... |
| `/shop` | Shop All \| ZOVIQ | Browse our complete streetwear collection... |
| `/collection/[slug]` | {Collection Name} \| ZOVIQ | Dynamic from Shopify |
| `/product/[handle]` | {Product Name} \| ZOVIQ | Dynamic from Shopify product description |
| `/search` | Search \| ZOVIQ | Search ZOVIQ streetwear... |
| `/cart` | Your Cart \| ZOVIQ | — |
| `/about` | About \| ZOVIQ | The story behind ZOVIQ... |

### Open Graph Tags

Every page includes OG tags for social sharing:
- `og:title`
- `og:description`
- `og:image` (product image or default brand image)
- `og:url`
- `og:type` (website or product)

Product pages also include:
- `og:price:amount`
- `og:price:currency`

### Sitemap

Generated automatically via `app/sitemap.ts`:
- All static pages
- All product pages (fetched from Shopify)
- All collection pages

### robots.txt

Generated via `app/robots.ts`:
```
User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Sitemap: https://zoviq.com/sitemap.xml
```

### Product Structured Data (JSON-LD)

Product pages include JSON-LD for Google rich results:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Oversized Black Tee",
  "image": "https://...",
  "description": "...",
  "offers": {
    "@type": "Offer",
    "price": "799",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## Performance Strategy

### Image Optimization

- Use Next.js `<Image>` component for automatic:
  - WebP/AVIF conversion
  - Lazy loading
  - Responsive sizing
  - Blur placeholder
- Shopify CDN already serves optimized images — we leverage their URL parameters

### Server Components

- Product listing pages use server components (no JavaScript sent to browser)
- Only interactive parts (cart, filters, selectors) are client components
- This reduces the amount of JavaScript the browser needs to download

### Avoid Unnecessary API Calls

- Fetch products in server components (cached by Next.js)
- Don't re-fetch data that's already available
- Use React Context for cart state (single source of truth)

### Mobile-First Performance

- Target: First Contentful Paint < 1.5s on 4G
- Lazy load below-the-fold images and sections
- Minimize JavaScript bundle size
- Use Tailwind CSS purging (removes unused CSS automatically)

### Caching Strategy

- Static pages (About, Shipping, etc.): fully static, rebuilt on deploy
- Product pages: revalidated every 60 seconds (ISR — Incremental Static Regeneration)
- Cart data: not cached (always fresh from Shopify)

```typescript
// Example: Revalidate product data every 60 seconds
export const revalidate = 60;
```

---

## TypeScript Types

All Shopify data types are defined in `types/shopify.ts`:

```typescript
// types/shopify.ts

// A single product
interface Product {
  id: string;
  title: string;
  handle: string;          // URL slug
  description: string;
  descriptionHtml: string;
  priceRange: PriceRange;
  compareAtPriceRange: PriceRange;
  images: Image[];
  variants: Variant[];
  availableForSale: boolean;
  tags: string[];
}

// Product variant (e.g., "Black / Large")
interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
}

// Money amount
interface Money {
  amount: string;
  currencyCode: string;
}

// Price range (min/max)
interface PriceRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}

// Image
interface Image {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

// Selected option (e.g., { name: "Size", value: "L" })
interface SelectedOption {
  name: string;
  value: string;
}

// Collection
interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: Image | null;
}

// Collection with products
interface CollectionWithProducts extends Collection {
  products: Product[];
}

// Cart
interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: CartCost;
  lines: CartLine[];
}

// Cart cost
interface CartCost {
  subtotalAmount: Money;
  totalAmount: Money;
  totalTaxAmount: Money | null;
}

// Cart line item
interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      title: string;
      handle: string;
      images: Image[];
    };
  };
}
```

---

## Future Integration Points

The architecture is designed so these can be added later without rewriting existing code:

### Razorpay (Custom Payments)
- Add a Next.js API route (`app/api/razorpay/route.ts`) to create payment orders
- Razorpay SDK loads in a client component
- After payment, confirm via webhook → Shopify order

### Shiprocket (Shipping & Tracking)
- Add API routes for shipment creation and tracking
- Shopify webhook → create Shiprocket shipment automatically
- Tracking page component shows real-time updates

### WhatsApp Notifications
- Shopify webhook → trigger WhatsApp API on order events
- Server-side only (API routes)

### Google Analytics / Meta Pixel
- Add tracking scripts to `app/layout.tsx`
- Fire events on key actions (page view, add to cart, purchase)
- Can be added with zero changes to existing components

---

## Development Tools

| Tool | Purpose |
|---|---|
| **VS Code** | Code editor |
| **Node.js 18+** | JavaScript runtime |
| **npm** | Package manager |
| **Shopify Partner Account** | Free development store for testing |
| **Vercel** | Hosting and deployment |
| **Git + GitHub** | Version control |
| **Chrome DevTools** | Debugging and mobile testing |

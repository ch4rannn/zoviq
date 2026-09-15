# 01 — ZOVIQ Project Plan

## Brand Overview

| Field | Detail |
|---|---|
| **Brand Name** | ZOVIQ |
| **Brand Positioning** | Premium, minimal Gen-Z streetwear brand — affordable luxury with a clean aesthetic |
| **Target Customer** | Gen-Z and college-age shoppers (18–25), mobile-first, Instagram-driven, pan-India |
| **Product Category** | Streetwear — starting with T-shirts, expanding to hoodies, cargos, joggers, caps |
| **Business Model** | Dropshipping via Meesho suppliers → test winning products → direct supplier → custom packaging → own inventory/private label |
| **Long-term Vision** | Build ZOVIQ into a recognisable Indian streetwear label sold on its own website AND larger marketplaces (Amazon, Flipkart, Myntra) |

---

## MVP Goals

The first version of the website must include everything a customer needs to discover, browse, and buy a product.

### MVP Features (v1)

| # | Feature | Priority | Description |
|---|---|---|---|
| 1 | Homepage | MUST | Hero, featured collections, new arrivals, brand story, newsletter |
| 2 | Product Listing Page | MUST | Grid of products with image, name, price, discount badge |
| 3 | Product Detail Page | MUST | Image gallery, variants, size guide, add-to-cart, description |
| 4 | Category / Collection Pages | MUST | Browse by collection (e.g., "Oversized", "Graphic Tees") |
| 5 | Search | MUST | Search products by keyword |
| 6 | Product Filtering | MUST | Filter by size, color, price, sort order |
| 7 | Product Variants | MUST | Size + color selection on product page |
| 8 | Shopping Cart | MUST | Slide-out cart drawer with quantity controls |
| 9 | Checkout | MUST | Redirect to Shopify's hosted checkout |
| 10 | Shopify Checkout Integration | MUST | Cart → Shopify checkout URL → payment → order |
| 11 | Order Confirmation | MUST | Thank-you page after successful purchase |
| 12 | Responsive Mobile Design | MUST | Mobile-first, works on 375px–1440px+ |
| 13 | Basic SEO | MUST | Metadata, Open Graph, structured data, sitemap |
| 14 | Loading States | MUST | Skeleton loaders and spinners during data fetch |
| 15 | Error States | MUST | Friendly error messages when things go wrong |

### Future Features (NOT in v1)

| Feature | Notes |
|---|---|
| User accounts / login | Shopify customer accounts |
| Wishlist | Save products for later |
| Reviews & ratings | User-generated content |
| Coupons / promo codes | Shopify discount codes |
| Loyalty program | Points-based rewards |
| Referral system | Share-and-earn |
| WhatsApp order updates | Automated notifications |
| Advanced analytics | Google Analytics 4, Meta Pixel |
| Razorpay custom integration | Indian payment gateway |
| Shiprocket integration | Shipping & tracking |
| Admin dashboard | Internal order/product management |
| AI recommendations | "You might also like" engine |

---

## User Journey

### Happy Path (Success)

```
Visitor lands on Homepage
  → Browses a Collection (e.g., "Oversized Tees")
  → Clicks a Product
  → Selects Size & Color
  → Clicks "Add to Cart"
  → Reviews Cart (drawer slides open)
  → Clicks "Checkout"
  → Redirected to Shopify Checkout
  → Enters shipping details
  → Selects payment method (UPI / COD / Card)
  → Completes payment
  → Redirected to Order Confirmation page
  → Receives order confirmation email from Shopify
```

### Failure Cases

| Scenario | What Happens |
|---|---|
| Product not found | Show a friendly 404 page with a link back to the shop |
| Variant out of stock | Disable the variant button, show "Sold Out" badge |
| Product removed from Shopify | Show "This product is no longer available" |
| Cart expires (Shopify carts expire after ~10 days) | Create a new cart automatically |
| Shopify API is down | Show a retry message: "Something went wrong. Please try again." |
| Checkout fails | Shopify handles this — user sees Shopify's own error page |
| Slow internet | Show loading skeletons; don't show a blank page |
| Search returns no results | Show "No products found" with suggestions |

---

## Pages

| Route | Purpose |
|---|---|
| `/` | **Homepage** — Hero banner, featured collections, new arrivals, brand story, newsletter, social proof |
| `/shop` | **Shop All** — Full product grid with filtering and sorting |
| `/collection/[slug]` | **Collection Page** — Products in a specific collection (e.g., `/collection/oversized-tees`) |
| `/product/[handle]` | **Product Detail Page** — Full product info, image gallery, variants, add-to-cart |
| `/search` | **Search Results** — Show products matching a search query |
| `/cart` | **Cart Page** — Full-page cart view (also accessible via cart drawer) |
| `/checkout` | **Checkout Redirect** — Redirects user to Shopify's hosted checkout URL |
| `/order-success` | **Order Confirmation** — Thank-you page after successful payment |
| `/about` | **About Page** — Brand story, values, mission |
| `/contact` | **Contact Page** — Contact form or email/phone/socials |
| `/shipping` | **Shipping Policy** — Delivery timelines, charges, areas served |
| `/returns` | **Return Policy** — Return/exchange process |
| `/privacy` | **Privacy Policy** — Data handling, cookies |
| `/terms` | **Terms & Conditions** — Legal terms of use |

---

## Components

### Layout Components

| Component | Description |
|---|---|
| `AnnouncementBar` | Top banner for offers (e.g., "Free Shipping Over ₹999") |
| `Navbar` | Main navigation — logo, links, search, cart icon |
| `MobileMenu` | Slide-out menu for mobile navigation |
| `Footer` | Links, socials, newsletter, copyright |
| `Layout` | Wraps every page with Navbar + Footer |

### Product Components

| Component | Description |
|---|---|
| `ProductCard` | Displays a product thumbnail — image, name, price, discount |
| `ProductGrid` | Responsive grid layout for product cards |
| `ProductImageGallery` | Main image + thumbnail carousel on product page |
| `SizeSelector` | Clickable size buttons (S, M, L, XL, XXL) |
| `ColorSelector` | Color swatches for variant selection |
| `QuantitySelector` | +/− quantity input |
| `AddToCartButton` | "Add to Cart" button with loading state |
| `PriceDisplay` | Shows current price + original price + discount % |

### Cart Components

| Component | Description |
|---|---|
| `CartDrawer` | Slide-out cart panel from the right |
| `CartItem` | Single item row inside the cart (image, name, quantity, price) |
| `CartSummary` | Subtotal, shipping estimate, checkout button |

### UI Components

| Component | Description |
|---|---|
| `SearchBar` | Search input with autocomplete/suggestions |
| `FilterBar` | Sidebar or top-bar filters (size, color, price, sort) |
| `LoadingSpinner` | Spinner for async operations |
| `SkeletonCard` | Skeleton placeholder while products load |
| `ErrorMessage` | Friendly error display component |
| `Badge` | "New", "Sale", "Sold Out" badges |
| `Breadcrumb` | Navigation breadcrumb (Home > Shop > Product) |
| `SizeGuide` | Modal/popup with size chart |

### Homepage Sections

| Component | Description |
|---|---|
| `HeroSection` | Full-width hero with image/video + CTA |
| `FeaturedCollection` | Highlighted collection row |
| `NewArrivals` | Latest products section |
| `BrandStatement` | Brand story / mission section |
| `BestSellers` | Top-selling products row |
| `LifestyleBanner` | Lifestyle image banner with CTA |
| `SocialSection` | Instagram feed / social proof |
| `Newsletter` | Email signup section |

---

## Development Roadmap

### Phase 1 — Project Setup

**What we build:**
- Initialize Next.js project with TypeScript and Tailwind CSS
- Set up folder structure
- Configure environment variables
- Create basic layout (Navbar + Footer placeholder)
- Set up Shopify Storefront API client

**Files involved:**
- `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`
- `.env.local`, `.env.example`
- `app/layout.tsx`, `app/page.tsx`
- `lib/shopify.ts` (API client)
- `types/shopify.ts` (TypeScript types)

**Expected result:**
- Next.js app runs at `localhost:3000`
- Shopify API client can fetch products (console-only test)

**How to test:**
- `npm run dev` → homepage loads
- Console log confirms Shopify API connection

---

### Phase 2 — Design System & Global Styles

**What we build:**
- Implement color tokens, typography, spacing in Tailwind config
- Create global CSS styles
- Build reusable UI components: Button, Badge, LoadingSpinner, ErrorMessage
- Build Navbar and Footer

**Files involved:**
- `tailwind.config.ts` (theme extension)
- `app/globals.css`
- `components/ui/Button.tsx`
- `components/ui/Badge.tsx`
- `components/ui/LoadingSpinner.tsx`
- `components/ui/ErrorMessage.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/AnnouncementBar.tsx`
- `components/layout/MobileMenu.tsx`

**Expected result:**
- Consistent visual design across the site
- Navbar with logo, links, search icon, cart icon
- Footer with links and social icons
- All components are responsive

**How to test:**
- Visual review on mobile (375px) and desktop (1440px)
- All buttons and components render correctly

---

### Phase 3 — Homepage

**What we build:**
- Full homepage with all sections
- Hero section with CTA
- Featured collection, New Arrivals, Best Sellers
- Brand statement, lifestyle banner
- Newsletter signup, social section

**Files involved:**
- `app/page.tsx`
- `components/home/HeroSection.tsx`
- `components/home/FeaturedCollection.tsx`
- `components/home/NewArrivals.tsx`
- `components/home/BrandStatement.tsx`
- `components/home/BestSellers.tsx`
- `components/home/LifestyleBanner.tsx`
- `components/home/SocialSection.tsx`
- `components/home/Newsletter.tsx`

**Expected result:**
- Homepage loads with all sections
- Products are fetched from Shopify and displayed
- Page is fully responsive

**How to test:**
- Visual review on all breakpoints
- Products load from Shopify
- CTA buttons navigate correctly

---

### Phase 4 — Product Pages

**What we build:**
- Shop All page (`/shop`)
- Collection page (`/collection/[slug]`)
- Product detail page (`/product/[handle]`)
- ProductCard, ProductGrid, ProductImageGallery
- SizeSelector, ColorSelector, QuantitySelector
- Filtering and sorting
- Search page (`/search`)

**Files involved:**
- `app/shop/page.tsx`
- `app/collection/[slug]/page.tsx`
- `app/product/[handle]/page.tsx`
- `app/search/page.tsx`
- `components/product/ProductCard.tsx`
- `components/product/ProductGrid.tsx`
- `components/product/ProductImageGallery.tsx`
- `components/product/SizeSelector.tsx`
- `components/product/ColorSelector.tsx`
- `components/product/QuantitySelector.tsx`
- `components/product/AddToCartButton.tsx`
- `components/product/PriceDisplay.tsx`
- `components/product/SizeGuide.tsx`
- `components/shop/FilterBar.tsx`
- `components/shop/SearchBar.tsx`
- `lib/shopify.ts` (add product/collection queries)

**Expected result:**
- Browse all products with filters
- View products by collection
- View full product details with variant selection
- Search products by keyword

**How to test:**
- Navigate to `/shop` → products load
- Click a product → detail page loads
- Select variant → price/availability updates
- Search for a product → results appear

---

### Phase 5 — Shopping Cart

**What we build:**
- Cart context (React Context for cart state)
- CartDrawer (slide-out panel)
- CartItem, CartSummary
- Add to cart, update quantity, remove item
- Full cart page (`/cart`)

**Files involved:**
- `context/CartContext.tsx`
- `components/cart/CartDrawer.tsx`
- `components/cart/CartItem.tsx`
- `components/cart/CartSummary.tsx`
- `app/cart/page.tsx`
- `lib/shopify.ts` (add cart mutations)

**Expected result:**
- Click "Add to Cart" → item appears in cart drawer
- Update quantity → cart updates
- Remove item → item removed
- Cart persists across page navigation

**How to test:**
- Add product to cart → drawer opens with item
- Change quantity → subtotal updates
- Remove item → cart updates
- Refresh page → cart persists (via Shopify cart ID in localStorage)

---

### Phase 6 — Shopify Checkout Integration

**What we build:**
- Generate Shopify checkout URL from cart
- Redirect user to Shopify checkout
- Checkout page that handles the redirect
- Order success page

**Files involved:**
- `app/checkout/page.tsx`
- `app/order-success/page.tsx`
- `lib/shopify.ts` (checkout URL query)

**Expected result:**
- Click "Checkout" → redirect to Shopify checkout
- Complete payment → redirect to order confirmation
- Order success page shows thank-you message

**How to test:**
- With Shopify test mode enabled, complete a test purchase
- Verify order appears in Shopify admin

---

### Phase 7 — Static Pages & SEO

**What we build:**
- About, Contact, Shipping, Returns, Privacy, Terms pages
- Metadata for all pages
- Open Graph tags
- Sitemap (`sitemap.xml`)
- `robots.txt`
- Product structured data (JSON-LD)

**Files involved:**
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/shipping/page.tsx`
- `app/returns/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- Metadata in each `page.tsx` or `layout.tsx`

**Expected result:**
- All info pages are accessible and styled
- SEO metadata renders correctly in page source
- Sitemap and robots.txt are generated

**How to test:**
- Visit each page
- View page source → verify `<title>`, `<meta>`, OG tags
- Visit `/sitemap.xml` and `/robots.txt`

---

### Phase 8 — Polish & Testing

**What we build:**
- Error boundaries and 404 page
- Loading skeletons for all data-fetching pages
- Accessibility improvements (focus states, aria labels)
- Performance optimization (image optimization, lazy loading)
- Cross-browser testing
- Mobile testing on real devices

**Files involved:**
- `app/not-found.tsx`
- `app/error.tsx`
- `components/ui/SkeletonCard.tsx`
- Various existing components (add loading/error states)

**Expected result:**
- No blank screens during loading
- Friendly error pages
- Fast load times (< 3s on mobile 4G)
- Works on Chrome, Safari, Firefox

**How to test:**
- Throttle network in DevTools → verify loading states
- Navigate to invalid URL → verify 404 page
- Run Lighthouse audit → aim for 90+ on all scores

---

### Phase 9 — Deployment

**What we build:**
- Deploy to Vercel
- Connect custom domain (zoviq.com or similar)
- Set up environment variables in Vercel
- Enable Vercel Analytics
- Final production testing

**Files involved:**
- `vercel.json` (if needed)
- Vercel dashboard configuration

**Expected result:**
- Site is live at custom domain
- All pages and checkout work in production
- SSL certificate is active

**How to test:**
- Visit the live URL
- Complete a test purchase end-to-end
- Test on multiple devices

---

## Summary

| Phase | Deliverable | Estimated Effort |
|---|---|---|
| 1 | Project setup + Shopify client | Small |
| 2 | Design system + Navbar + Footer | Medium |
| 3 | Homepage (all sections) | Medium |
| 4 | Product pages + search + filters | Large |
| 5 | Shopping cart | Medium |
| 6 | Checkout + order confirmation | Small |
| 7 | Static pages + SEO | Medium |
| 8 | Polish + testing | Medium |
| 9 | Deployment | Small |

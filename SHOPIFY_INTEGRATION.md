# Connecting ZOVIQ to Shopify

The frontend of ZOVIQ is fully built and currently runs on **mock data**. To connect it to your real Shopify store, follow these exact steps.

## Step 1: Get Your Shopify API Credentials

1. Log in to your Shopify Admin panel.
2. Go to **Settings** (bottom left corner) > **Apps and sales channels**.
3. Click on **Develop apps** (top right).
4. Click **Create an app**. Name it something like "ZOVIQ Custom Storefront".
5. Click on **Configure Storefront API scopes**.
6. Check the boxes to allow reading products, collections, and inventory.
7. Click **Save** and then **Install app**.
8. Go to the **API credentials** tab.
9. You will need:
   - **Storefront API access token** (This starts with `shpat_` or similar)
   - **Your store domain** (e.g., `zovio.myshopify.com`)

## Step 2: Add Credentials to `.env.local`

1. Open the `.env.local` file in the root of this project (if it doesn't exist, duplicate `.env.example` and rename it).
2. Fill in the values:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token_here
   NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-01
   ```

## Step 3: Switch the Code from Mock Data to Shopify API

Currently, the app uses mock data from `lib/mock-data.ts`. To use real data, you need to swap the import statements in a few key files.

### 1. `app/page.tsx` (Homepage)
Find:
```typescript
import { MOCK_PRODUCTS, getMockNewArrivals, getMockBestSellers } from '@/lib/mock-data';

export default function HomePage() {
  const allProducts = MOCK_PRODUCTS;
  const newArrivals = getMockNewArrivals();
  const bestSellers = getMockBestSellers();
```
Replace with:
```typescript
import { getProducts } from '@/lib/shopify';

export default async function HomePage() {
  const allProducts = await getProducts({ first: 4 });
  const newArrivals = await getProducts({ query: 'tag:new', first: 4 });
  const bestSellers = await getProducts({ query: 'tag:bestseller', first: 4 });
```

### 2. `app/shop/page.tsx`
Find:
```typescript
import { MOCK_PRODUCTS } from '@/lib/mock-data';

export default async function ShopPage() {
  const products = MOCK_PRODUCTS;
```
Replace with:
```typescript
import { getProducts } from '@/lib/shopify';

export default async function ShopPage() {
  const products = await getProducts();
```

### 3. `app/collection/[handle]/page.tsx`
Find:
```typescript
import { MOCK_PRODUCTS, getMockNewArrivals, getMockBestSellers } from '@/lib/mock-data';
```
Replace the logic inside the component to use `await getCollection(handle)` from `lib/shopify.ts`.

### 4. `app/product/[handle]/page.tsx`
Find:
```typescript
import { MOCK_PRODUCTS } from '@/lib/mock-data';
// ...
const product = MOCK_PRODUCTS.find((p) => p.handle === resolvedParams.handle);
```
Replace with:
```typescript
import { getProduct, getProducts } from '@/lib/shopify';
// ...
const product = await getProduct(resolvedParams.handle);
const allProducts = await getProducts({ first: 5 });
const relatedProducts = allProducts.filter(p => p.id !== product?.id).slice(0, 4);
```

### 5. `app/search/page.tsx`
Find:
```typescript
import { MOCK_PRODUCTS } from '@/lib/mock-data';
// ...
const results = MOCK_PRODUCTS.filter(...)
```
Replace with:
```typescript
import { searchProducts } from '@/lib/shopify';
// ...
const results = await searchProducts(searchQuery);
```

### 6. `lib/cart-context.tsx`
Currently, `addToCart`, `updateCartItem`, and `removeFromCart` use mock logic.
Update these functions to use `createCart`, `addToCart`, `updateCart`, and `removeFromCart` from `lib/shopify.ts`.
You will also need to store the `cart.id` in `localStorage` instead of the whole cart object, and fetch the cart using `getCart(cartId)` when the app loads.

## Step 4: Restart the Server

Run `npm run dev` and your store will now be serving live data from Shopify!

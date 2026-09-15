# ZOVIQ Admin Portal — Requirements Document

> This document lists every feature, page, and integration required for the ZOVIQ Admin Portal.
> Use it as a blueprint when building the admin dashboard.

---

## 1. Purpose

The Admin Portal gives the ZOVIQ team a single dashboard to manage products, orders, customers, content, and analytics — without needing to log into Shopify Admin for every task.

**Key Principle:** Shopify remains the source of truth for products, orders, and payments. The Admin Portal reads from and writes to Shopify via its Admin API, while also managing ZOVIQ-specific features (like homepage content, banners, and marketing) that Shopify doesn't handle.

---

## 2. Tech Stack (Recommended)

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js (App Router) | Same stack as the storefront — one codebase, shared types |
| Auth | NextAuth.js | Simple, supports Google/email login, role-based access |
| Database | Supabase (PostgreSQL) | Free tier, stores admin-only data (banners, blog posts, settings) |
| API | Shopify Admin API (GraphQL) | Manages products, orders, customers, inventory |
| Charts | Recharts or Chart.js | Lightweight charting for the dashboard |
| Hosting | Vercel | Same as storefront, easy deployment |

---

## 3. User Roles & Permissions

| Role | Access Level |
|---|---|
| **Super Admin** (You) | Full access to everything |
| **Manager** | Products, orders, customers, content — no settings or billing |
| **Content Editor** | Homepage content, banners, blog posts only |
| **Viewer** | Read-only access to dashboard and analytics |

---

## 4. Pages & Features

### 4.1 Dashboard (Home)

The first page an admin sees after logging in. Shows a snapshot of the business.

| Widget | Data Source | Description |
|---|---|---|
| Today's Revenue | Shopify Orders API | Total sales amount for today |
| Total Orders (Today / This Week / This Month) | Shopify Orders API | Order count with comparison to previous period |
| Pending Orders | Shopify Orders API | Orders that need fulfillment |
| Low Stock Alerts | Shopify Inventory API | Products with stock below a threshold (e.g., < 5 units) |
| Revenue Chart | Shopify Orders API | Line chart — daily/weekly/monthly revenue trend |
| Top Selling Products | Shopify Orders API | Bar chart — top 5 products by units sold |
| Recent Orders | Shopify Orders API | Table — last 10 orders with status badges |
| Visitor Stats | Google Analytics API (optional) | Unique visitors, page views, bounce rate |

---

### 4.2 Order Management

| Feature | Description |
|---|---|
| Order List | Table with columns: Order #, Customer Name, Date, Total, Payment Status, Fulfillment Status |
| Order Filters | Filter by: status (pending, fulfilled, cancelled, refunded), date range, payment status |
| Order Search | Search by order number, customer name, or email |
| Order Detail Page | Full order info: items ordered, quantities, variant details, shipping address, payment method, timeline of events |
| Update Fulfillment | Mark order as fulfilled, add tracking number + courier name |
| Cancel / Refund | Cancel an order or issue a partial/full refund (via Shopify API) |
| Print Invoice | Generate a PDF invoice for each order |
| Bulk Actions | Select multiple orders → mark as fulfilled, export to CSV |
| Order Notes | Internal notes visible only to admins |

---

### 4.3 Product Management

| Feature | Description |
|---|---|
| Product List | Table with columns: Image, Title, Price, Compare-at Price, Stock, Status (active/draft), Tags |
| Product Filters | Filter by: category, status, tag, stock level, price range |
| Add New Product | Form with: title, description (rich text editor), images (drag & drop upload), price, compare-at price, variants (size/color), tags, SEO fields |
| Edit Product | Same form as Add, pre-filled with existing data |
| Delete Product | Soft delete (archive) or hard delete with confirmation modal |
| Bulk Price Update | Select multiple products → update price or discount percentage |
| Image Management | Upload multiple images per product, drag to reorder, set featured image |
| Variant Management | Add/edit/remove size and color variants, set individual prices and stock per variant |
| Stock Management | View current stock levels, update stock quantities, set low-stock threshold |
| Product Tags | Add/remove tags for filtering (e.g., "new", "bestseller", "sale") |
| Duplicate Product | Clone an existing product to speed up creation of similar items |

---

### 4.4 Inventory

| Feature | Description |
|---|---|
| Inventory Overview | Table showing all variants with current stock levels |
| Low Stock Dashboard | Filtered view showing only items below the threshold |
| Stock Adjustment | Manually increase/decrease stock with a reason (e.g., "damaged", "received shipment") |
| Stock History | Log of all stock changes with timestamps and reasons |
| Restock Alerts | Email notification when a product goes below threshold |

---

### 4.5 Customer Management

| Feature | Description |
|---|---|
| Customer List | Table with: Name, Email, Phone, Total Orders, Total Spent, Date Joined |
| Customer Search | Search by name, email, or phone |
| Customer Detail Page | Profile: contact info, order history, total lifetime value, notes |
| Customer Tags | Tag customers (e.g., "VIP", "repeat buyer", "first-time") |
| Customer Notes | Add internal notes about a customer |
| Export Customers | Export customer list as CSV for email marketing |

---

### 4.6 Homepage / Content Management (CMS)

These features manage content that is NOT stored in Shopify — it lives in your own database (Supabase).

| Feature | Description |
|---|---|
| **Announcement Bar** | Edit the top banner text, link URL, and background color |
| **Hero Section** | Upload hero image, set headline text, subheadline, CTA button text and link |
| **Featured Collections** | Pick which collections appear on the homepage and in what order |
| **Brand Statement** | Edit the brand statement text and accent text |
| **Lifestyle Banner** | Upload image, set overlay text and CTA |
| **Social Section** | Upload Instagram images, set Instagram handle link |
| **Newsletter Section** | Edit heading and subtext |
| **Footer** | Edit footer links, social media URLs, copyright text |
| **SEO Settings** | Set default meta title, description, and OG image for the homepage |

---

### 4.7 Discount & Coupon Management

| Feature | Description |
|---|---|
| Create Discount Code | Set code name, discount type (percentage or fixed), amount, minimum order value, usage limit, expiry date |
| Edit / Delete Code | Modify or remove existing discount codes |
| Automatic Discounts | Set rules like "10% off orders above ₹1999" (applied automatically at checkout) |
| Active Discounts List | Table of all currently active discount codes with usage stats |
| Discount Analytics | Track how many times each code was used and total revenue generated |

---

### 4.8 Analytics & Reports

| Report | Description |
|---|---|
| Sales Report | Revenue breakdown by day/week/month with comparison to previous periods |
| Product Performance | Top sellers, worst performers, products with most views vs. purchases (conversion) |
| Order Report | Total orders, average order value, orders by status |
| Customer Report | New vs. returning customers, customer acquisition over time |
| Traffic Report | Page views, unique visitors, traffic sources (requires Google Analytics integration) |
| Inventory Report | Stock value, items needing restock, dead stock (not sold in 30+ days) |
| Export to CSV/PDF | All reports should be downloadable |

---

### 4.9 Marketing Tools

| Feature | Description |
|---|---|
| Email Subscriber List | View all newsletter subscribers, export as CSV |
| Campaign Tracker | Log marketing campaigns (Instagram ads, influencer collabs) with spend and revenue attributed |
| Abandoned Cart Recovery | List of customers who added items but didn't check out (from Shopify) |
| Social Media Links | Manage social media profile URLs displayed on the site |

---

### 4.10 Settings

| Setting | Description |
|---|---|
| Store Information | Store name, contact email, phone number, address |
| Shipping Settings | Free shipping threshold, shipping rates by region, estimated delivery times |
| Tax Settings | GST number, tax percentage display |
| Payment Settings | Display Shopify payment configuration status |
| Admin Users | Invite new admin users, assign roles, remove access |
| API Keys | View/manage Shopify API keys and other integrations |
| Notification Preferences | Toggle email alerts for: new orders, low stock, refund requests |

---

### 4.11 Returns & Refunds

| Feature | Description |
|---|---|
| Return Requests | List of return/exchange requests with status (pending, approved, rejected, completed) |
| Process Return | Approve/reject a return, specify reason, initiate refund |
| Return Policy Editor | Edit the return policy text displayed on the website |
| Refund History | Log of all refunds issued with amounts and reasons |

---

## 5. Database Schema (Supabase — Admin-Only Data)

These tables store data that Shopify doesn't manage.

```
┌──────────────────────────┐
│ admin_users              │
├──────────────────────────┤
│ id (uuid, PK)            │
│ email (text, unique)     │
│ name (text)              │
│ role (enum)              │
│ created_at (timestamp)   │
│ last_login (timestamp)   │
└──────────────────────────┘

┌──────────────────────────┐
│ homepage_content         │
├──────────────────────────┤
│ id (uuid, PK)            │
│ section (text)           │  ← e.g., "hero", "announcement", "brand_statement"
│ content (jsonb)          │  ← flexible JSON for each section's fields
│ is_active (boolean)      │
│ updated_at (timestamp)   │
│ updated_by (uuid, FK)    │
└──────────────────────────┘

┌──────────────────────────┐
│ newsletter_subscribers   │
├──────────────────────────┤
│ id (uuid, PK)            │
│ email (text, unique)     │
│ subscribed_at (timestamp)│
│ is_active (boolean)      │
└──────────────────────────┘

┌──────────────────────────┐
│ marketing_campaigns      │
├──────────────────────────┤
│ id (uuid, PK)            │
│ name (text)              │
│ platform (text)          │  ← "instagram", "facebook", "influencer"
│ spend (decimal)          │
│ revenue (decimal)        │
│ start_date (date)        │
│ end_date (date)          │
│ notes (text)             │
│ created_at (timestamp)   │
└──────────────────────────┘

┌──────────────────────────┐
│ activity_log             │
├──────────────────────────┤
│ id (uuid, PK)            │
│ admin_id (uuid, FK)      │
│ action (text)            │  ← "created_product", "fulfilled_order", etc.
│ details (jsonb)          │
│ created_at (timestamp)   │
└──────────────────────────┘
```

---

## 6. API Integrations Required

| Integration | Purpose | API Used |
|---|---|---|
| **Shopify Admin API** | Products, orders, customers, inventory, discounts | GraphQL Admin API |
| **Supabase** | Homepage content, subscribers, campaigns, admin users | Supabase JS Client |
| **Google Analytics** | Traffic and visitor data for the analytics dashboard | GA4 Data API |
| **Shiprocket / Delhivery** (optional) | Auto-generate shipping labels and tracking | REST API |
| **Email Service** (optional) | Send order confirmations, low-stock alerts | Resend / Mailchimp API |

---

## 7. Security Checklist

- [ ] All admin routes behind authentication (NextAuth.js)
- [ ] Role-based access control on every page and API route
- [ ] CSRF protection on all forms
- [ ] Rate limiting on login attempts
- [ ] Shopify Admin API token stored in environment variables (never exposed to client)
- [ ] Supabase Row Level Security (RLS) enabled
- [ ] Activity logging for all destructive actions (delete, refund, price change)
- [ ] Session timeout after 30 minutes of inactivity
- [ ] HTTPS enforced

---

## 8. Suggested Build Order

| Phase | What to Build | Estimated Time |
|---|---|---|
| **Phase 1** | Auth + Layout + Dashboard (with static data) | 2–3 days |
| **Phase 2** | Order Management (list, detail, fulfill) | 2–3 days |
| **Phase 3** | Product Management (CRUD, variants, images) | 3–4 days |
| **Phase 4** | Inventory + Customer Management | 2 days |
| **Phase 5** | Homepage CMS (edit banners, hero, collections) | 2 days |
| **Phase 6** | Analytics & Reports (charts, exports) | 2–3 days |
| **Phase 7** | Discounts, Marketing, Returns | 2–3 days |
| **Phase 8** | Settings, Security Hardening, Testing | 2 days |

**Total estimated time: ~3–4 weeks** (working part-time as a beginner)

---

## 9. Admin Portal URL Structure

```
/admin                          → Dashboard
/admin/orders                   → Order list
/admin/orders/[id]              → Order detail
/admin/products                 → Product list
/admin/products/new             → Add new product
/admin/products/[id]            → Edit product
/admin/inventory                → Inventory overview
/admin/customers                → Customer list
/admin/customers/[id]           → Customer detail
/admin/content                  → Homepage CMS
/admin/content/hero             → Edit hero section
/admin/content/announcement     → Edit announcement bar
/admin/discounts                → Discount codes
/admin/discounts/new            → Create new discount
/admin/analytics                → Analytics dashboard
/admin/analytics/sales          → Sales report
/admin/analytics/products       → Product performance
/admin/marketing                → Marketing tools
/admin/returns                  → Returns & refunds
/admin/settings                 → Store settings
/admin/settings/users           → Admin user management
```

---

> **Note:** This is a requirements document. No code has been written yet. When you're ready to start building the Admin Portal, we will follow the phased approach above, one step at a time.

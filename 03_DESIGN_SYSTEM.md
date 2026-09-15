# 03 — ZOVIQ Design System

## Design Philosophy

ZOVIQ should feel like a **premium, modern streetwear brand** — not a generic e-commerce template.

**Guiding Principles:**

| Principle | Meaning |
|---|---|
| **Minimal** | Remove everything unnecessary. Let the products speak. |
| **Bold** | Strong typography, confident layout, clear hierarchy. |
| **Premium** | Every pixel should feel intentional and high-end. |
| **Mobile-first** | Design for phones first, then scale up. |
| **Fashion-forward** | Take inspiration from Nike, FEAR OF GOD, Stüssy, REPRESENT — not Amazon. |

**Avoid:**
- Cheap-looking templates with busy layouts
- Excessive gradients or glowing effects
- Too many colors competing for attention
- Heavy animations that slow down the site
- Cluttered product grids
- Generic marketplace aesthetics

---

## Brand Identity

### Wordmark

```
ZOVIQ
```

- Always **UPPERCASE**
- Use the primary heading font (Inter, weight 800)
- Minimum size: 18px on mobile
- The wordmark IS the logo — no icon/symbol for now
- Letter-spacing: `0.08em` (slightly tracked out for a premium feel)

### Brand Voice

- **Confident** but not arrogant
- **Minimal** — say more with less
- **Youthful** — speak to Gen-Z without trying too hard
- **Direct** — no corporate jargon

---

## Color System

A deliberately minimal palette. Streetwear brands don't use 15 colors.

### Core Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0A0A0A` | Primary text, headings, buttons |
| `--color-secondary` | `#FFFFFF` | Backgrounds, inverse text |
| `--color-accent` | `#C8A97E` | Accent elements — warm gold/tan (subtle luxury feel) |
| `--color-accent-hover` | `#B8955F` | Accent hover state |

### Neutral Scale

| Token | Hex | Usage |
|---|---|---|
| `--color-gray-50` | `#FAFAFA` | Page background |
| `--color-gray-100` | `#F5F5F5` | Card backgrounds, alternating sections |
| `--color-gray-200` | `#E5E5E5` | Borders, dividers |
| `--color-gray-300` | `#D4D4D4` | Disabled states |
| `--color-gray-400` | `#A3A3A3` | Placeholder text |
| `--color-gray-500` | `#737373` | Secondary text |
| `--color-gray-600` | `#525252` | Body text |
| `--color-gray-700` | `#404040` | Emphasized body text |
| `--color-gray-800` | `#262626` | Headings, strong text |
| `--color-gray-900` | `#171717` | Primary text |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#16A34A` | Success messages, in-stock indicators |
| `--color-error` | `#DC2626` | Error messages, sold-out badges |
| `--color-warning` | `#F59E0B` | Warning messages, low stock |
| `--color-sale` | `#DC2626` | Sale/discount badges and prices |

### Why This Palette?

- **Black + White** = classic streetwear DNA (think any high-end streetwear brand)
- **Warm Gold Accent** (`#C8A97E`) = adds a touch of luxury without being flashy. It's used SPARINGLY — CTAs, highlights, hover states
- **Neutral grays** = needed for UI elements, but the site stays predominantly black and white

---

## Typography

### Font Family

**Primary Font:** [Inter](https://fonts.google.com/specimen/Inter)

Why Inter?
- Clean, modern sans-serif
- Excellent readability on screens
- Wide range of weights
- Free via Google Fonts
- Used by many premium brands

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Type Scale

| Role | Desktop | Tablet | Mobile | Weight | Tracking |
|---|---|---|---|---|---|
| **Display** (Hero headline) | 64px / 4rem | 48px / 3rem | 36px / 2.25rem | 800 | `-0.02em` |
| **H1** (Page title) | 48px / 3rem | 36px / 2.25rem | 28px / 1.75rem | 700 | `-0.02em` |
| **H2** (Section heading) | 36px / 2.25rem | 28px / 1.75rem | 24px / 1.5rem | 700 | `-0.01em` |
| **H3** (Subsection) | 24px / 1.5rem | 22px / 1.375rem | 20px / 1.25rem | 600 | `0` |
| **H4** (Card title) | 20px / 1.25rem | 18px / 1.125rem | 16px / 1rem | 600 | `0` |
| **Body Large** | 18px / 1.125rem | 16px / 1rem | 16px / 1rem | 400 | `0` |
| **Body** | 16px / 1rem | 15px / 0.9375rem | 14px / 0.875rem | 400 | `0` |
| **Body Small** | 14px / 0.875rem | 13px / 0.8125rem | 13px / 0.8125rem | 400 | `0` |
| **Caption** | 12px / 0.75rem | 12px / 0.75rem | 12px / 0.75rem | 500 | `0.02em` |
| **Button** | 14px / 0.875rem | 14px / 0.875rem | 14px / 0.875rem | 600 | `0.05em` |
| **Nav Link** | 14px / 0.875rem | — | 16px / 1rem | 500 | `0.04em` |
| **Price** | 18px / 1.125rem | 16px / 1rem | 16px / 1rem | 600 | `0` |
| **Compare Price** | 16px / 1rem | 14px / 0.875rem | 14px / 0.875rem | 400 | `0` |

### Line Heights

| Context | Line Height |
|---|---|
| Headings | 1.1 – 1.2 |
| Body text | 1.5 – 1.6 |
| Buttons | 1 |
| Captions | 1.4 |

---

## Spacing System

Use a consistent 4px-based scale:

| Token | Value | Common Usage |
|---|---|---|
| `space-1` | 4px | Inline icon gaps |
| `space-2` | 8px | Tight padding, badge padding |
| `space-3` | 12px | Small gaps between elements |
| `space-4` | 16px | Standard padding, grid gaps |
| `space-5` | 20px | Card padding |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Section gaps |
| `space-10` | 40px | Large section padding |
| `space-12` | 48px | Page section spacing (mobile) |
| `space-16` | 64px | Page section spacing (desktop) |
| `space-20` | 80px | Large section spacing (desktop) |
| `space-24` | 96px | Hero section padding |

### Container Widths

| Breakpoint | Max Width | Padding |
|---|---|---|
| Mobile (< 768px) | 100% | 16px left/right |
| Tablet (768px–1024px) | 720px | 24px left/right |
| Desktop (1024px–1440px) | 1200px | 32px left/right |
| Wide (> 1440px) | 1400px | 32px left/right |

---

## Buttons

### Primary Button (CTA — "Add to Cart", "Shop Now")

```
Background:  #0A0A0A (black)
Text:        #FFFFFF (white)
Font:        14px, weight 600, uppercase, letter-spacing 0.05em
Padding:     14px 32px
Border:      none
Radius:      0px (sharp corners — streetwear aesthetic)
Transition:  all 0.2s ease

Hover:       background #262626
Active:      background #0A0A0A, scale(0.98)
Disabled:    background #D4D4D4, text #A3A3A3, cursor not-allowed
Loading:     Show spinner, disable click
```

### Secondary Button ("Continue Shopping")

```
Background:  transparent
Text:        #0A0A0A
Border:      1.5px solid #0A0A0A
Padding:     14px 32px
Radius:      0px

Hover:       background #0A0A0A, text #FFFFFF
Active:      scale(0.98)
Disabled:    border-color #D4D4D4, text #A3A3A3
```

### Accent Button ("Buy Now")

```
Background:  #C8A97E (accent gold)
Text:        #0A0A0A
Padding:     14px 32px
Radius:      0px

Hover:       background #B8955F
Active:      scale(0.98)
```

### Text Button (Inline links, "View All")

```
Background:  transparent
Text:        #0A0A0A
Border:      none
Padding:     0
Underline:   1px underline with 4px offset

Hover:       text #525252
```

### Button Sizes

| Size | Padding | Font Size |
|---|---|---|
| Small | 10px 20px | 12px |
| Medium (default) | 14px 32px | 14px |
| Large | 18px 40px | 16px |
| Full Width | 16px 0, width 100% | 14px |

---

## Product Cards

### Layout

```
┌──────────────────────┐
│                      │
│    Product Image     │   Aspect ratio: 3:4 (portrait)
│    (hover: zoom)     │   Background: #F5F5F5
│                      │
│  ┌────┐              │   Badge: top-left corner
│  │NEW │              │   (or "SALE" / "SOLD OUT")
│  └────┘              │
├──────────────────────┤
│ Product Name         │   Font: 14px, weight 500
│ ₹799  ₹1,299  -38%  │   Price: 16px weight 600, Compare: 14px line-through
└──────────────────────┘
```

### Specifications

| Property | Value |
|---|---|
| **Image ratio** | 3:4 (portrait, like a fashion lookbook) |
| **Image background** | `#F5F5F5` (light gray) |
| **Image hover** | Scale to 1.05 with `transition: transform 0.4s ease` |
| **Product name** | 14px, weight 500, color `#171717`, max 2 lines, ellipsis overflow |
| **Current price** | 16px, weight 600, color `#171717` |
| **Compare-at price** | 14px, weight 400, color `#737373`, line-through |
| **Discount badge** | 12px, weight 600, `#DC2626` text (red) |
| **Card gap** | 16px between cards on mobile, 24px on desktop |
| **Grid columns** | 2 on mobile, 3 on tablet, 4 on desktop |
| **Card border** | None (clean look) |
| **Card shadow** | None (flat design) |

### Badges

| Badge | Background | Text | When |
|---|---|---|---|
| **NEW** | `#0A0A0A` | `#FFFFFF` | Product tagged "new" |
| **SALE** | `#DC2626` | `#FFFFFF` | Compare-at price > current price |
| **SOLD OUT** | `#FFFFFF` with border | `#0A0A0A` | `availableForSale` is false |

### Product Card Hover

```
Desktop only:
- Image scales to 1.05
- Second image fades in (if available) — shows alternate angle
- Cursor becomes pointer
```

---

## Navbar

### Desktop Navbar

```
┌──────────────────────────────────────────────────────────────────────┐
│  ZOVIQ          SHOP    COLLECTIONS    NEW ARRIVALS     🔍    🛒(2) │
└──────────────────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| **Height** | 64px |
| **Background** | `#FFFFFF` (or transparent on homepage hero) |
| **Border bottom** | 1px solid `#E5E5E5` |
| **Logo** | "ZOVIQ" — 20px, weight 800, letter-spacing 0.08em |
| **Nav links** | 14px, weight 500, uppercase, letter-spacing 0.04em |
| **Nav link hover** | Color fades to `#737373` with 0.2s transition |
| **Cart icon** | Shows item count badge (accent color background) |
| **Position** | Sticky top |
| **z-index** | 50 |

### Mobile Navbar

```
┌──────────────────────────┐
│  ☰   ZOVIQ       🔍  🛒 │
└──────────────────────────┘
```

| Property | Value |
|---|---|
| **Height** | 56px |
| **Hamburger menu** | Left side — opens MobileMenu |
| **Logo** | Centered — 18px, weight 800 |
| **Icons** | Right side — search + cart |
| **Cart badge** | Small dot or number on cart icon |

### Mobile Menu (Slide-out)

```
┌──────────────────────────┐
│  ✕ Close                 │
│                          │
│  SHOP                    │
│  COLLECTIONS             │
│  NEW ARRIVALS            │
│  ABOUT                   │
│                          │
│  ─────────────────────── │
│                          │
│  Shipping                │
│  Returns                 │
│  Contact                 │
│                          │
└──────────────────────────┘
```

- Slides in from the left
- Full-height overlay
- Background overlay (semi-transparent black)
- Links: 20px, weight 500, spaced 16px apart
- Close button: top-right

---

## Announcement Bar

```
┌──────────────────────────────────────────────────────────────────────┐
│                   FREE SHIPPING ON ORDERS OVER ₹999                  │
└──────────────────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| **Background** | `#0A0A0A` (black) |
| **Text** | `#FFFFFF`, 12px, weight 500, uppercase, letter-spacing 0.05em |
| **Height** | 36px |
| **Text align** | Center |
| **Position** | Above navbar, can be dismissible |

---

## Homepage Sections

### 1. Announcement Bar
See above.

### 2. Navbar
See above.

### 3. Hero Section

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                  Full-width image/video                 │
│                                                        │
│              REDEFINE YOUR STYLE                       │
│              Premium streetwear for the                │
│              new generation.                           │
│                                                        │
│              [ SHOP NOW ]                              │
│                                                        │
└────────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| **Height** | 100vh on desktop, 80vh on mobile |
| **Image** | Full-width lifestyle/product photography |
| **Overlay** | Semi-transparent black gradient from bottom |
| **Headline** | Display font, white, centered or left-aligned |
| **Subheadline** | Body large, white/gray |
| **CTA** | Primary button (white text on black) or accent button |
| **Animation** | Subtle fade-in on load (0.6s) |

### 4. Featured Collection

```
┌────────────────────────────────────────────────────────┐
│  OVERSIZED COLLECTION                                  │
│                                                        │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                  │
│  │ IMG │  │ IMG │  │ IMG │  │ IMG │                    │
│  │     │  │     │  │     │  │     │                    │
│  │Name │  │Name │  │Name │  │Name │                    │
│  │₹799 │  │₹899 │  │₹749 │  │₹999 │                    │
│  └─────┘  └─────┘  └─────┘  └─────┘                  │
│                                                        │
│                  VIEW ALL →                            │
└────────────────────────────────────────────────────────┘
```

- Section heading: H2, uppercase
- Grid of 4 ProductCards (2 on mobile, scrollable)
- "View All" text link below

### 5. New Arrivals

Same layout as Featured Collection, different heading: "NEW ARRIVALS"

### 6. Brand Statement

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│          ZOVIQ IS NOT JUST CLOTHING.                   │
│          IT'S A STATEMENT.                             │
│                                                        │
│          Born from the streets, designed for           │
│          those who dare to stand out.                  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- Centered text on a clean background (`#FAFAFA` or `#0A0A0A` with white text)
- Display or H1 font
- Large vertical padding (96px top/bottom)
- Optional accent-colored horizontal rule

### 7. Best Sellers

Same ProductGrid layout as Featured Collection. Heading: "BEST SELLERS"

### 8. Lifestyle Banner

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│         Full-width lifestyle photography               │
│         with text overlay                              │
│                                                        │
│         MADE FOR THE STREETS                           │
│         [ EXPLORE ]                                    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- Height: 50vh desktop, 40vh mobile
- Parallax or fixed background effect (optional)
- Text + CTA overlaid

### 9. Social Section

```
┌────────────────────────────────────────────────────────┐
│  FOLLOW @ZOVIQ                                         │
│                                                        │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐            │
│  │IG │  │IG │  │IG │  │IG │  │IG │  │IG │             │
│  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘            │
└────────────────────────────────────────────────────────┘
```

- Grid of 6 square images (Instagram-style)
- 1:1 aspect ratio
- Hover: slight overlay with Instagram icon
- Links to Instagram posts

### 10. Newsletter

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│          JOIN THE ZOVIQ COMMUNITY                      │
│          Get early access, drops & exclusive deals.    │
│                                                        │
│          [  your@email.com          ] [ SUBSCRIBE ]    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- Background: `#0A0A0A` with white text
- Email input + submit button
- Inline or stacked on mobile
- Success message: "You're in! Welcome to ZOVIQ."

### 11. Footer

```
┌────────────────────────────────────────────────────────┐
│  ZOVIQ                                                 │
│                                                        │
│  SHOP          INFO           HELP                     │
│  All Products  About          Shipping                 │
│  New Arrivals  Contact        Returns                  │
│  Collections   Privacy        Size Guide               │
│               Terms                                    │
│                                                        │
│  ─────────────────────────────────────────────         │
│  © 2024 ZOVIQ. All rights reserved.                    │
│  Instagram  Twitter                                    │
└────────────────────────────────────────────────────────┘
```

- Background: `#0A0A0A`
- Text: `#A3A3A3` (gray-400)
- Links hover: `#FFFFFF`
- 4 columns on desktop, stacked on mobile
- Social icons in footer bottom

---

## Product Page

### Layout

```
Desktop:                          Mobile:
┌────────────────────────────┐    ┌──────────────────┐
│ ┌──────┐ ┌──────────────┐  │    │   Image Carousel  │
│ │thumb │ │              │  │    │  (swipe to scroll) │
│ │thumb │ │  Main Image  │  │    ├──────────────────┤
│ │thumb │ │              │  │    │ Product Name      │
│ │thumb │ │              │  │    │ ₹799  ₹1,299     │
│ └──────┘ └──────────────┘  │    │                  │
│                            │    │ Color: ● ● ●      │
│         Product Name       │    │ Size:  S M L XL   │
│         ₹799  ₹1,299 -38% │    │ Size Guide        │
│                            │    │                  │
│         Color: ● ● ●      │    │ Qty: [- 1 +]      │
│         Size: S M L XL    │    │                  │
│         Size Guide         │    │ [  ADD TO CART  ]  │
│                            │    │ [    BUY NOW    ]  │
│         Qty: [- 1 +]      │    │                  │
│                            │    │ Description       │
│         [ ADD TO CART ]    │    │ Product Details   │
│         [ BUY NOW ]       │    │ Shipping Info     │
│                            │    │ Returns           │
│         ▼ Description      │    ├──────────────────┤
│         ▼ Product Details  │    │ Related Products  │
│         ▼ Shipping Info    │    └──────────────────┘
│         ▼ Returns          │
├────────────────────────────┤
│      Related Products      │
└────────────────────────────┘
```

### Product Page Specifications

| Element | Details |
|---|---|
| **Image gallery** | Desktop: thumbnails on left, main image right (60/40 split). Mobile: horizontal carousel with swipe. |
| **Main image** | Aspect ratio 3:4, click to zoom (lightbox) |
| **Thumbnails** | 4–6 thumbnails, active thumbnail has dark border |
| **Product name** | H1, 28px mobile / 36px desktop |
| **Price** | 18px weight 600. If on sale: original price crossed out, sale price in red |
| **Color selector** | Circular swatches (24px), active has dark ring + checkmark |
| **Size selector** | Pill buttons, active has dark fill + white text. Sold-out sizes have diagonal strikethrough |
| **Size guide** | Text link → opens modal with size chart table |
| **Quantity** | −/+ buttons with number input, min 1, max 10 |
| **Add to Cart** | Primary button (full width on mobile) |
| **Buy Now** | Accent button (skips cart, goes directly to checkout) |
| **Description tabs** | Accordion or tabs: Description, Product Details, Shipping, Returns |
| **Related products** | Row of 4 ProductCards (scrollable on mobile) |

### Sticky Add to Cart (Mobile Only)

```
┌──────────────────────────────────────┐
│  ₹799       [ ADD TO CART ]          │  ← Fixed to bottom of screen
└──────────────────────────────────────┘
```

- Appears when the main "Add to Cart" button scrolls out of view
- Shows price + CTA
- Height: 64px
- Background: white with top border
- z-index: 40

---

## Cart Drawer

### Layout

```
                                  ┌──────────────────┐
                                  │  YOUR CART (2)  ✕ │
                                  │                  │
                                  │  ┌────┐ Name    │
                                  │  │IMG │ Black/L  │
                                  │  └────┘ ₹799     │
                                  │         [- 1 +]  │
                                  │                  │
                                  │  ┌────┐ Name    │
                                  │  │IMG │ White/M  │
                                  │  └────┘ ₹899     │
                                  │         [- 1 +]  │
                                  │                  │
                                  │  ──────────────  │
                                  │  Subtotal: ₹1698 │
                                  │  Shipping at     │
                                  │  checkout         │
                                  │                  │
                                  │  [ CHECKOUT ]    │
                                  │  Continue Shopping│
                                  └──────────────────┘
```

| Property | Value |
|---|---|
| **Width** | 400px desktop, 100% mobile |
| **Position** | Fixed right, full height |
| **Background** | White |
| **Overlay** | Semi-transparent black (`rgba(0,0,0,0.5)`) |
| **Animation** | Slide in from right, 0.3s ease |
| **Close** | ✕ button top-right, or click overlay |
| **Item image** | 80x100px (3:4 ratio) |
| **Checkout button** | Primary button, full width |
| **Empty cart** | "Your cart is empty" + "Continue Shopping" link |

---

## Mobile Design Guidelines

### Touch Targets

- Minimum touch target: **44px × 44px** (Apple HIG recommendation)
- Buttons: minimum height 48px on mobile
- Nav icons: 44px × 44px hit area
- Product card: entire card is tappable

### Mobile-First Patterns

| Pattern | Implementation |
|---|---|
| **Product images** | Horizontal swipe carousel with dots indicator |
| **Size selection** | Large pill buttons (min 44px height), easy thumb tap |
| **Add to cart** | Sticky bottom bar when main CTA scrolls out of view |
| **Navigation** | Hamburger menu (slide-out), not horizontal nav |
| **Search** | Full-screen search overlay |
| **Filters** | Bottom sheet or full-screen overlay (not sidebar) |
| **Cart** | Full-screen drawer (not small popup) |

### Breakpoints

| Name | Width | Target |
|---|---|---|
| `mobile` | < 768px | Phones (375px, 390px, 414px) |
| `tablet` | 768px – 1024px | iPads, tablets |
| `desktop` | 1024px – 1440px | Laptops |
| `wide` | > 1440px | Large monitors |

---

## Animations

### Guiding Rule

> Animations must **enhance** the experience, never **slow it down**. If a user notices an animation is making them wait, it's too slow.

### Animation Specifications

| Element | Animation | Duration | Easing |
|---|---|---|---|
| **Page transition** | Fade in | 0.3s | ease |
| **Product image hover** | Scale to 1.05 | 0.4s | ease |
| **Button hover** | Background color change | 0.2s | ease |
| **Cart drawer** | Slide in from right | 0.3s | ease-out |
| **Mobile menu** | Slide in from left | 0.3s | ease-out |
| **Modal overlay** | Fade in | 0.2s | ease |
| **Accordion expand** | Height animation | 0.3s | ease |
| **Skeleton loader** | Pulse shimmer | 1.5s | ease-in-out (infinite) |
| **Toast notification** | Slide up + fade in | 0.3s | ease-out |
| **Scroll sections** | Fade in + slide up (subtle) | 0.5s | ease | 

### What NOT to Animate

- Product prices
- Text content
- Navigation links (only color on hover)
- Page scrolling (keep native behavior)
- Form inputs

---

## Form Elements

### Input Fields

```
┌──────────────────────────┐
│  placeholder text        │
└──────────────────────────┘

Height:       48px
Border:       1px solid #E5E5E5
Border focus: 1px solid #0A0A0A
Radius:       0px (consistent with buttons)
Padding:      0 16px
Font:         14px, weight 400
Background:   #FFFFFF
```

### Search Input

```
🔍  Search products...

Full-width on mobile
Max-width 480px on desktop
Auto-focus when search overlay opens
```

---

## Icons

Use a lightweight icon set. Recommended: **Lucide Icons** (tree-shakeable, React-friendly).

| Icon | Usage |
|---|---|
| `Search` | Search button/input |
| `ShoppingBag` | Cart icon |
| `Menu` | Mobile hamburger |
| `X` | Close buttons |
| `Plus` / `Minus` | Quantity controls |
| `ChevronDown` | Accordions, dropdowns |
| `ChevronRight` | Breadcrumbs, "View All" |
| `Heart` | Wishlist (future) |
| `Instagram` | Social link |
| `Twitter` | Social link |
| `Check` | Selected variant, success |
| `AlertCircle` | Error messages |

Icon size: 20px default, 24px for nav icons.

---

## Component Summary

### Tailwind Config Extensions

```javascript
// tailwind.config.ts — theme extension outline
{
  colors: {
    primary: '#0A0A0A',
    secondary: '#FFFFFF',
    accent: { DEFAULT: '#C8A97E', hover: '#B8955F' },
    gray: { 50–900 scale as defined above },
    success: '#16A34A',
    error: '#DC2626',
    warning: '#F59E0B',
    sale: '#DC2626',
  },
  fontFamily: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  },
  fontSize: {
    // Custom scale matching the type scale above
  },
  spacing: {
    // Uses Tailwind's default 4px scale (already matches our system)
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
  },
}
```

---

## Design Checklist

Before launching, verify:

- [ ] All text is readable (sufficient contrast)
- [ ] All interactive elements have hover states
- [ ] All buttons have disabled states
- [ ] Loading states exist for all data-fetching views
- [ ] Error states exist for all failure scenarios
- [ ] Mobile nav works smoothly
- [ ] Product images load quickly
- [ ] Cart drawer animation is smooth
- [ ] Size selection is easy on mobile (big touch targets)
- [ ] Checkout flow works end-to-end
- [ ] Footer links all work
- [ ] Announcement bar is visible but not annoying
- [ ] Color palette is consistent (no random colors)
- [ ] Typography hierarchy is clear
- [ ] Spacing is consistent throughout

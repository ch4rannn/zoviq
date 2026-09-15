// ==================================
// Site-wide Constants
// ==================================
// All hardcoded values in one place.
// Change these to update the entire site.

/** Brand name — used in headings, metadata, footer, etc. */
export const SITE_NAME = 'ZOVIQ';

/** Default page title suffix */
export const SITE_TITLE = 'ZOVIQ — Premium Streetwear';

/** Default meta description */
export const SITE_DESCRIPTION =
  'Shop premium Gen-Z streetwear. Oversized tees, graphic tees, minimalist styles and more. Free shipping over ₹999.';

/** Base URL for production (update when domain is set up) */
export const SITE_URL = 'https://zoviq.com';

/** Currency used across the site */
export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';

/** Free shipping threshold in rupees */
export const FREE_SHIPPING_THRESHOLD = 999;

/** Announcement bar message */
export const ANNOUNCEMENT_TEXT = `FREE SHIPPING ON ORDERS OVER ${CURRENCY_SYMBOL}${FREE_SHIPPING_THRESHOLD}`;

/** Navigation links for the desktop navbar */
export const NAV_LINKS = [
  { label: 'SHOP', href: '/shop' },
  { label: 'COLLECTIONS', href: '/collections' },
  { label: 'NEW ARRIVALS', href: '/collection/new-arrivals' },
] as const;

/** Footer link groups */
export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/collection/new-arrivals' },
    { label: 'Best Sellers', href: '/collection/best-sellers' },
  ],
  info: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
  help: [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns & Exchange', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
  ],
} as const;

/** Social media links */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/zoviq',
  twitter: 'https://twitter.com/zoviq',
} as const;

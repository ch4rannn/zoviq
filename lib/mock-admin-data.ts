// ==================================
// Mock Admin Data
// ==================================
// Fake data for the admin portal during development.
// Will be replaced with Shopify Admin API + Supabase calls.

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: string;
  itemCount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partially_fulfilled' | 'cancelled';
  items: {
    title: string;
    variant: string;
    quantity: number;
    price: string;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: string;
  joinedDate: string;
  tags: string[];
}

export interface AdminProduct {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: string;
  compareAtPrice: string;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  category: string;
  tags: string[];
}

export interface DashboardStats {
  todayRevenue: string;
  todayOrders: number;
  weekOrders: number;
  monthOrders: number;
  pendingOrders: number;
  lowStockCount: number;
  totalCustomers: number;
  avgOrderValue: string;
}

// ---- Dashboard Stats ----
export const MOCK_DASHBOARD_STATS: DashboardStats = {
  todayRevenue: '12,450',
  todayOrders: 14,
  weekOrders: 87,
  monthOrders: 342,
  pendingOrders: 8,
  lowStockCount: 3,
  totalCustomers: 1245,
  avgOrderValue: '889',
};

// ---- Revenue Chart Data (last 7 days) ----
export const MOCK_REVENUE_CHART = [
  { day: 'Mon', revenue: 8200 },
  { day: 'Tue', revenue: 11400 },
  { day: 'Wed', revenue: 9800 },
  { day: 'Thu', revenue: 14200 },
  { day: 'Fri', revenue: 16800 },
  { day: 'Sat', revenue: 19500 },
  { day: 'Sun', revenue: 12450 },
];

// ---- Top Products Chart Data ----
export const MOCK_TOP_PRODUCTS = [
  { name: 'Oversized Tee — Black', sold: 89 },
  { name: 'Oversized Tee — White', sold: 76 },
  { name: 'Graphic Tee — Charcoal', sold: 54 },
  { name: 'Oversized Tee — Sand', sold: 47 },
];

// ---- Orders ----
export const MOCK_ORDERS: AdminOrder[] = [
  {
    id: 'order-1',
    orderNumber: '#1001',
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav@gmail.com',
    date: '2024-01-20T14:30:00Z',
    total: '1598.00',
    itemCount: 2,
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { title: 'Oversized Essential Tee — Black', variant: 'Size: M', quantity: 1, price: '799.00', image: '/images/product-1.jpg' },
      { title: 'Oversized Essential Tee — White', variant: 'Size: L', quantity: 1, price: '799.00', image: '/images/product-2.jpg' },
    ],
    shippingAddress: { name: 'Aarav Sharma', line1: '12A, Green Park Colony', city: 'New Delhi', state: 'Delhi', zip: '110016', phone: '+91 98765 43210' },
  },
  {
    id: 'order-2',
    orderNumber: '#1002',
    customerName: 'Priya Patel',
    customerEmail: 'priya.patel@gmail.com',
    date: '2024-01-20T11:15:00Z',
    total: '899.00',
    itemCount: 1,
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { title: 'Geometric Graphic Tee — Charcoal', variant: 'Size: L', quantity: 1, price: '899.00', image: '/images/product-3.jpg' },
    ],
    shippingAddress: { name: 'Priya Patel', line1: '45 Shanti Nagar', city: 'Mumbai', state: 'Maharashtra', zip: '400050', phone: '+91 87654 32109' },
  },
  {
    id: 'order-3',
    orderNumber: '#1003',
    customerName: 'Rohit Kumar',
    customerEmail: 'rohit.k@outlook.com',
    date: '2024-01-19T16:45:00Z',
    total: '2397.00',
    itemCount: 3,
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { title: 'Oversized Essential Tee — Black', variant: 'Size: XL', quantity: 1, price: '799.00', image: '/images/product-1.jpg' },
      { title: 'Oversized Essential Tee — Sand', variant: 'Size: L', quantity: 1, price: '799.00', image: '/images/product-4.jpg' },
      { title: 'Oversized Essential Tee — White', variant: 'Size: XL', quantity: 1, price: '799.00', image: '/images/product-2.jpg' },
    ],
    shippingAddress: { name: 'Rohit Kumar', line1: '78 Sector 15', city: 'Gurugram', state: 'Haryana', zip: '122001', phone: '+91 76543 21098' },
  },
  {
    id: 'order-4',
    orderNumber: '#1004',
    customerName: 'Neha Gupta',
    customerEmail: 'neha.gupta@gmail.com',
    date: '2024-01-19T09:20:00Z',
    total: '799.00',
    itemCount: 1,
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { title: 'Oversized Essential Tee — Sand', variant: 'Size: S', quantity: 1, price: '799.00', image: '/images/product-4.jpg' },
    ],
    shippingAddress: { name: 'Neha Gupta', line1: '23 MG Road', city: 'Bangalore', state: 'Karnataka', zip: '560001', phone: '+91 65432 10987' },
  },
  {
    id: 'order-5',
    orderNumber: '#1005',
    customerName: 'Arjun Reddy',
    customerEmail: 'arjun.r@gmail.com',
    date: '2024-01-18T20:10:00Z',
    total: '1698.00',
    itemCount: 2,
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { title: 'Geometric Graphic Tee — Charcoal', variant: 'Size: M', quantity: 1, price: '899.00', image: '/images/product-3.jpg' },
      { title: 'Oversized Essential Tee — Black', variant: 'Size: M', quantity: 1, price: '799.00', image: '/images/product-1.jpg' },
    ],
    shippingAddress: { name: 'Arjun Reddy', line1: '56 Jubilee Hills', city: 'Hyderabad', state: 'Telangana', zip: '500033', phone: '+91 54321 09876' },
  },
  {
    id: 'order-6',
    orderNumber: '#1006',
    customerName: 'Simran Kaur',
    customerEmail: 'simran@gmail.com',
    date: '2024-01-18T15:30:00Z',
    total: '799.00',
    itemCount: 1,
    paymentStatus: 'refunded',
    fulfillmentStatus: 'cancelled',
    items: [
      { title: 'Oversized Essential Tee — White', variant: 'Size: M', quantity: 1, price: '799.00', image: '/images/product-2.jpg' },
    ],
    shippingAddress: { name: 'Simran Kaur', line1: '89 Model Town', city: 'Chandigarh', state: 'Punjab', zip: '160022', phone: '+91 43210 98765' },
  },
];

// ---- Customers ----
export const MOCK_CUSTOMERS: AdminCustomer[] = [
  { id: 'cust-1', name: 'Aarav Sharma', email: 'aarav@gmail.com', phone: '+91 98765 43210', totalOrders: 5, totalSpent: '4,495', joinedDate: '2023-11-15', tags: ['repeat buyer'] },
  { id: 'cust-2', name: 'Priya Patel', email: 'priya.patel@gmail.com', phone: '+91 87654 32109', totalOrders: 3, totalSpent: '2,697', joinedDate: '2023-12-01', tags: [] },
  { id: 'cust-3', name: 'Rohit Kumar', email: 'rohit.k@outlook.com', phone: '+91 76543 21098', totalOrders: 8, totalSpent: '7,192', joinedDate: '2023-10-20', tags: ['VIP', 'repeat buyer'] },
  { id: 'cust-4', name: 'Neha Gupta', email: 'neha.gupta@gmail.com', phone: '+91 65432 10987', totalOrders: 1, totalSpent: '799', joinedDate: '2024-01-19', tags: ['first-time'] },
  { id: 'cust-5', name: 'Arjun Reddy', email: 'arjun.r@gmail.com', phone: '+91 54321 09876', totalOrders: 4, totalSpent: '3,596', joinedDate: '2023-11-28', tags: ['repeat buyer'] },
  { id: 'cust-6', name: 'Simran Kaur', email: 'simran@gmail.com', phone: '+91 43210 98765', totalOrders: 2, totalSpent: '1,598', joinedDate: '2024-01-05', tags: [] },
];

// ---- Products ----
export const MOCK_ADMIN_PRODUCTS: AdminProduct[] = [
  { id: 'prod-1', title: 'Oversized Essential Tee — Black', handle: 'oversized-essential-tee-black', image: '/images/product-1.jpg', price: '799.00', compareAtPrice: '1299.00', stock: 42, status: 'active', category: 'T-Shirt', tags: ['oversized', 'essential', 'new'] },
  { id: 'prod-2', title: 'Oversized Essential Tee — White', handle: 'oversized-essential-tee-white', image: '/images/product-2.jpg', price: '799.00', compareAtPrice: '1299.00', stock: 38, status: 'active', category: 'T-Shirt', tags: ['oversized', 'essential', 'bestseller'] },
  { id: 'prod-3', title: 'Geometric Graphic Tee — Charcoal', handle: 'geometric-graphic-tee-charcoal', image: '/images/product-3.jpg', price: '899.00', compareAtPrice: '1499.00', stock: 4, status: 'active', category: 'T-Shirt', tags: ['graphic', 'new'] },
  { id: 'prod-4', title: 'Oversized Essential Tee — Sand', handle: 'oversized-essential-tee-sand', image: '/images/product-4.jpg', price: '799.00', compareAtPrice: '1299.00', stock: 56, status: 'active', category: 'T-Shirt', tags: ['oversized', 'essential', 'bestseller'] },
];

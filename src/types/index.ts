// User type
export type User = {
  id: string;
  email: string;
  role: "ADMIN" | "VENDOR" | "CUSTOMER";
  suspended?: Date | null;
  profile?: Profile | null;
  shop?: Shop | null;
  payment: Payment[];
  cart: Cart[];
  review: Review[];
  followedShops: ShopFollow[];
  order: Order[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// Profile type
type Profile = {
  id: string;
  name: string;
  address?: string | null;
  phone?: string | null;
  bio?: string | null;
  avatar?: string | null;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

// Shop type
export type Shop = {
  id: string;
  name: string;
  description: string;
  logo: string;
  userId: string;
  user: User;
  product: Product[];
  review: Review[];
  shopFollow: ShopFollow[];
  order: Order[];
  isBlacklisted: boolean;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  reviewResponse: ShopReviewResponse[];
};

// Product type
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  discount?: number | null;
  categoryId: string;
  category: Category;
  shopId: string;
  shop: Shop;
  orderItem: OrderItem[];
  cartItem: CartItem[];
  review: Review[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// Category type
export type Category = {
  id: string;
  name: string;
  description?: string | null;
  product: Product[];
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// Order type
export type Order = {
  id: string;
  totalAmount: number;
  discount: number;
  finalTotal: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  userId: string;
  shopId: string;
  orderItem: OrderItem[];
  paymentStatus?: "PENDING" | "PAID" | "FAILED" | null;
  paymentMethod?: "STRIPE" | null;

  createdAt: Date;
  updatedAt: Date;
};

// OrderItem type
export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  productId: string;
  order: Order;
  product: Product;
};

// Payment type
export type Payment = {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  transactionId: string;
  paymentMethod: "STRIPE";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paymentDetails?: string | null;
  order: Order;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

// Cart type
export type Cart = {
  id: string;
  userId: string;
  shopId: string;
  user: User;
  cartItems: CartItem[];
};

// CartItem type
export type CartItem = {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  cart: Cart;
  product: Product;
};

// Review type
export type Review = {
  id: string;
  userId: string;
  shopId: string;
  productId: string;
  rating: number;
  review?: string | null;
  user: User;
  shop: Shop;
  product: Product;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  reviewResponse: ShopReviewResponse[];
};

// ShopReviewResponse type
export type ShopReviewResponse = {
  id: string;
  reviewId: string;
  shopId: string;
  response: string;
  review: Review;
  shop: Shop;
  deletedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// ShopFollow type
export type ShopFollow = {
  id: string;
  shopId: string;
  userId: string;
  user: User;
  shop: Shop;
  createdAt: Date;
  updatedAt: Date;
};
export type UserRoles = "ADMIN" | "VENDOR" | "CUSTOMER";

export type Coupon = {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  startDate: Date;
  endDate: Date;
};

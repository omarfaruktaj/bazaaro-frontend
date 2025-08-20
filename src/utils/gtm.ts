/* eslint-disable @typescript-eslint/no-explicit-any */

import { CartItem } from "@/features/cart/cart-slice";
import { Product } from "@/types";

type EcommerceItem = {
  item_id: string | number;
  item_name: string;
  price: number;
  quantity?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_variant?: string;
  index?: number;
};

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

const pushToDataLayer = (event: string, ecommerce: Record<string, any>) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ecommerce,
    });
  }
};
const formatProductToItem = (
  product: Product,
  quantity = 1
): EcommerceItem => ({
  item_id: product.id,
  item_name: product.name,
  price: product.price,
  quantity,
  item_brand: "N/A",
  item_category: product.category.name || "N/A",
});

const formatCartItemToItem = (
  product: CartItem,
  quantity = 1
): EcommerceItem => ({
  item_id: product.productId,
  item_name: product.name,
  price: product.price,
  quantity,
  item_brand: "N/A",
  item_category: product.category || "N/A",
});
export const trackViewItemFromProduct = (product: Product) => {
  pushToDataLayer("view_item", {
    items: [formatProductToItem(product)],
  });
};

export const trackAddToCartFromProduct = (
  product: Product,
  quantity: number
) => {
  pushToDataLayer("add_to_cart", {
    currency: "USD",
    value: product.price * quantity,
    items: [formatProductToItem(product, quantity)],
  });
};

export const trackRemoveFromCartFromProduct = (
  product: Product,
  quantity: number
) => {
  pushToDataLayer("remove_from_cart", {
    currency: "USD",
    value: product.price * quantity,
    items: [formatProductToItem(product, quantity)],
  });
};

export const trackBeginCheckoutFromCart = (cartItems: CartItem[]) => {
  const items = cartItems.map((item) =>
    formatCartItemToItem(item, item.quantity)
  );
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  pushToDataLayer("begin_checkout", {
    currency: "USD",
    value: total,
    items,
  });
};

export const trackPurchaseFromCart = (
  cartItems: CartItem[],
  transactionId: string,
  options?: {
    tax?: number;
    shipping?: number;
    coupon?: string;
  }
) => {
  const items = cartItems.map((item) =>
    formatCartItemToItem(item, item.quantity)
  );
  const value = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  pushToDataLayer("purchase", {
    transaction_id: transactionId,
    affiliation: "Online Store",
    currency: "USD",
    value,
    tax: options?.tax || 0,
    shipping: options?.shipping || 0,
    coupon: options?.coupon || "",
    items,
  });
};

export const trackViewItemList = (items: Product[], item_list_name: string) => {
  pushToDataLayer("view_item_list", {
    item_list_name,
    items: items.map((item) => formatProductToItem(item, item.quantity)),
  });
};

export const trackSelectItem = (item: Product) => {
  pushToDataLayer("select_item", {
    items: [formatProductToItem(item)],
  });
};

import { RootState } from "@/redux/store";
import { Product } from "@/types";
import {
  trackAddToCartFromProduct,
  trackRemoveFromCartFromProduct,
} from "@/utils/gtm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  discount?: number;
  shopId: string;
  category: string;
}

export interface CartState {
  shopId: string | null;
  cartItems: CartItem[];
  loaded: boolean;
}

const initialState: CartState = {
  shopId: null,
  cartItems: [],
  loaded: false,
};

const saveCartToStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart(state) {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        state.shopId = parsed.shopId;
        state.cartItems = parsed.cartItems;
      }
      state.loaded = true;
    },

    addToCart(
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) {
      const product = action.payload.product;
      const quantity = action.payload.quantity || 1;

      if (
        state.shopId &&
        state.shopId !== product.shopId &&
        state.cartItems.length > 0
      ) {
        throw new Error("Different Vendor");
      }

      const existingItem = state.cartItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images[0],
          discount: product.discount,
          shopId: product.shopId,
          category: product.category.name,
        });
        state.shopId = product.shopId;
      }

      saveCartToStorage(state);
      trackAddToCartFromProduct(
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images[0],
          discount: product.discount,
          shopId: product.shopId,
          category: product.category.name,
        },
        quantity
      );
    },

    replaceCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      state.shopId = product.shopId;
      const cartItems = [
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
          discount: product.discount,
          shopId: product.shopId,
          category: product.category.name,
        },
      ];
      state.cartItems = cartItems;

      saveCartToStorage(state);
      trackAddToCartFromProduct(cartItems[0], 1);
    },

    clearCart(state) {
      state.shopId = null;
      state.cartItems = [];
      localStorage.removeItem("cart");
    },

    increaseQuantity(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state);
        trackAddToCartFromProduct(item, 1);
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state);
        trackRemoveFromCartFromProduct(
          {
            id: item.productId,
            name: item.name,
            price: item.price,
            category: { name: item.category },
            images: [item.image || ""],
            discount: item.discount,
            shopId: item.shopId,
          } as Product,
          1
        );
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const itemToRemove = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (itemToRemove) {
        trackRemoveFromCartFromProduct(
          {
            id: itemToRemove.productId,
            name: itemToRemove.name,
            price: itemToRemove.price,
            category: { name: itemToRemove.category },
            images: [itemToRemove.image || ""],
            discount: itemToRemove.discount,
            shopId: itemToRemove.shopId,
          } as Product,
          itemToRemove.quantity
        );
      }
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );

      if (state.cartItems.length === 0) {
        state.shopId = null;
      }

      saveCartToStorage(state);
    },
  },
});

export const {
  getCart,
  addToCart,
  replaceCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart;

import { RootState } from "@/redux/store";
import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  discount?: number;
  shopId: string;
}

export interface CartState {
  shopId: string | null;
  cartItems: CartItem[];
}

const initialState: CartState = {
  shopId: null,
  cartItems: [],
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
    },

    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

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
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
          discount: product.discount,
          shopId: product.shopId,
        });
        state.shopId = product.shopId;
      }

      saveCartToStorage(state);
    },

    replaceCart(state, action: PayloadAction<Product>) {
      const product = action.payload;

      state.shopId = product.shopId;
      state.cartItems = [
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
          discount: product.discount,
          shopId: product.shopId,
        },
      ];

      saveCartToStorage(state);
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
      }
    },

    decreaseQuantity(state, action: PayloadAction<string>) {
      const productId = action.payload;
      const item = state.cartItems.find((item) => item.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToStorage(state);
      }
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const productId = action.payload;
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

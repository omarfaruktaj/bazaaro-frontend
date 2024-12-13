import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductCompareState {
  products: Product[];
}

const initialState: ProductCompareState = {
  products: [],
};

export const productCompareSlice = createSlice({
  name: "ProductComparison",
  initialState,
  reducers: {
    addToCompare(state, action: PayloadAction<Product>) {
      const product = action.payload;

      if (
        state.products.length < 3 &&
        !state.products.some((p) => p.id === product.id)
      ) {
        state.products.push(product);
      }
    },
    removeFromCompare(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCompare(state) {
      state.products = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  productCompareSlice.actions;
export default productCompareSlice.reducer;

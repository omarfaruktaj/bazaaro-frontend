import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadRecentProductsFromLocalStorage = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem("recentProducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  } catch (error) {
    console.error("Failed to load recent products from localStorage", error);
    return [];
  }
};

const saveRecentProductsToLocalStorage = (products: Product[]) => {
  try {
    localStorage.setItem("recentProducts", JSON.stringify(products));
  } catch (error) {
    console.error("Failed to save recent products to localStorage", error);
  }
};

interface ProductState {
  recentVisitedProducts: Product[];
}

const initialState: ProductState = {
  recentVisitedProducts: loadRecentProductsFromLocalStorage(),
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addRecentVisitedProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;

      const alreadyInRecentVisitedProduct =
        state.recentVisitedProducts.findIndex((prod) => prod.id === product.id);

      if (alreadyInRecentVisitedProduct !== -1) return; // If found, do nothing

      state.recentVisitedProducts = [
        product,
        ...state.recentVisitedProducts,
      ].slice(0, 10);

      saveRecentProductsToLocalStorage(state.recentVisitedProducts);
    },

    setRecentProducts: (state, action: PayloadAction<Product[]>) => {
      state.recentVisitedProducts = action.payload;
      saveRecentProductsToLocalStorage(state.recentVisitedProducts);
    },
  },
});

export const { addRecentVisitedProduct, setRecentProducts } =
  productSlice.actions;

export default productSlice.reducer;

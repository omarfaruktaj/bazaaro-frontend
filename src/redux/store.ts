import authReducer from "@/features/auth/auth-slice";
import productCompareReducer from "@/features/product-compare/product-compare-slice";
import productReducer from "@/features/product/product-slice";
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/base-api";
import cartReducer from "@/features/cart/cart-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productComparison: productCompareReducer,
    product: productReducer,
    cart: cartReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

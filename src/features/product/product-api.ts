import { baseApi } from "@/redux/api/base-api";
import { Product } from "@/types";
import { Response } from "@/types/response";
import { ProductSchemaType, UpdateProductSchemaType } from "./schemas";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], null>({
      query: () => ({
        url: "/products",
      }),
      providesTags: ["PRODUCT"],
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
    getVendorProducts: builder.query<Product[], null>({
      query: () => ({
        url: "/shop/products",
      }),
      providesTags: ["PRODUCT"],
      transformResponse: (response: { data: Product[] }) => response.data,
    }),

    createProduct: builder.mutation<
      Response<Product>,
      ProductSchemaType & { shopId: string }
    >({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    updateProduct: builder.mutation<
      Response<Product>,
      {
        data: UpdateProductSchemaType & { shopId: string };
        productId: string;
      }
    >({
      query: ({ data, productId }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useGetVendorProductsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;

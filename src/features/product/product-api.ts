import { baseApi } from "@/redux/api/base-api";
import { Product } from "@/types";
import { Pagination, Response } from "@/types/response";
import { ProductSchemaType, UpdateProductSchemaType } from "./schemas";

type ProductQueryArg = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  include?: string;
};

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; pagination: Pagination },
      ProductQueryArg
    >({
      query: ({
        searchTerm,
        sort,
        minPrice,
        maxPrice,
        category,
        include,
        page = 1,
        limit = 2,
      }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: { [key: string]: any } = {
          page,
          limit,
          searchTerm,
          sort,
          include,
        };

        if (minPrice) params["price[gte]"] = minPrice;
        if (maxPrice) params["price[lte]"] = maxPrice;
        if (category) params["categoryId"] = category;

        return {
          params,
          url: `/products`,
        };
      },
      providesTags: ["PRODUCT"],
      transformResponse: (response: {
        data: Product[];
        pagination: Pagination;
      }) => ({
        products: response.data,
        pagination: response.pagination,
      }),
    }),

    getVendorProducts: builder.query<
      { products: Product[]; pagination: Pagination },
      { shopId: string; page?: number; limit?: number }
    >({
      query: ({ shopId, page = 1, limit = 10 }) => ({
        url: `/products`,
        params: {
          shopId,
          page,
          limit,
        },
      }),
      providesTags: ["PRODUCT"],
      transformResponse: (response: {
        data: Product[];
        pagination: Pagination;
      }) => ({
        products: response.data,
        pagination: response.pagination,
      }),
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
    deleteProduct: builder.mutation<Response<Product>, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
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
  useDeleteProductMutation,
} = productApi;

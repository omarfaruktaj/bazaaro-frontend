import { baseApi } from "@/redux/api/base-api";
import { Shop } from "@/types";
import { Pagination, Response } from "@/types/response";
import { UpdateShopSchemaType } from "./schemas";

type ShopQueryArg = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  category?: string;
  include?: string;
  shopId?: string;
};

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query<
      { shop: Shop[]; pagination: Pagination },
      ShopQueryArg
    >({
      query: ({ searchTerm, sort, include, page = 1, limit = 10 }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: { [key: string]: any } = {
          page,
          limit,
          searchTerm,
          sort,
          include,
        };

        return {
          params,
          url: "/shop",
        };
      },
      providesTags: ["SHOP"],
      transformResponse: (response: {
        data: Shop[];
        pagination: Pagination;
      }) => ({
        shop: response.data,
        pagination: response.pagination,
      }),
    }),
    getSingleShop: builder.query<Shop, string>({
      query: (shopId) => ({
        url: `/shop/${shopId}`,
      }),
      providesTags: ["SHOP"],
      transformResponse: (response: { data: Shop }) => response.data,
    }),

    followShop: builder.mutation<Shop, string>({
      query: (shopId) => ({
        url: `/shop/${shopId}/follow`,
      }),
      invalidatesTags: ["SHOP"],
      transformResponse: (response: { data: Shop }) => response.data,
    }),

    getMyShops: builder.query({
      query: () => ({
        url: "/shop/profile",
      }),
      providesTags: ["SHOP"],
      transformResponse: (response: { data: Shop }) => response.data,
    }),

    createShop: builder.mutation({
      query: (data) => ({
        url: "/shop",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SHOP"],
    }),

    updateShop: builder.mutation<
      Response<Shop>,
      {
        data: UpdateShopSchemaType;
        shopId: string;
      }
    >({
      query: ({ data, shopId }) => ({
        url: `/shop/${shopId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SHOP"],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useGetShopsQuery,
  useGetSingleShopQuery,
  useUpdateShopMutation,
  useFollowShopMutation,
  useGetMyShopsQuery,
} = categoryApi;

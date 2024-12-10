import { baseApi } from "@/redux/api/base-api";
import { Shop } from "@/types";
import { Response } from "@/types/response";
import { UpdateShopSchemaType } from "./schemas";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => ({
        url: "/shop",
      }),
      providesTags: ["SHOP"],
      transformResponse: (response: { data: Shop[] }) => response.data,
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
  useUpdateShopMutation,
  useGetMyShopsQuery,
} = categoryApi;

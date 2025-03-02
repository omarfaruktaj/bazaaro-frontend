import { baseApi } from "@/redux/api/base-api";
import { Cart } from "@/types";
import { Response } from "@/types/response";
import { CartSchemaType } from "./schemas";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, null>({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["CART"],
      transformResponse: (response: { data: Cart }) => response.data,
    }),

    addProductToCart: builder.mutation<Response<Cart>, CartSchemaType>({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),

    updateCartItemQuantity: builder.mutation<
      Response<Cart>,
      {
        data: { cartItemsId: string; quantity: number };
        cartId: string;
      }
    >({
      query: ({ data, cartId }) => ({
        url: `/cart/${cartId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CART"],
    }),

    deleteCartItem: builder.mutation<Response<Cart>, string>({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
} = cartApi;

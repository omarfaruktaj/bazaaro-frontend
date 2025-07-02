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

    // updateCartItemQuantity: builder.mutation<
    //   Response<Cart>,
    //   {
    //     data: { cartItemsId: string; quantity: number };
    //     cartId: string;
    //   }
    // >({
    //   query: ({ data, cartId }) => ({
    //     url: `/cart/${cartId}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   async onQueryStarted({ data }, { dispatch, queryFulfilled }) {
    //     const patchResult = dispatch(
    //       cartApi.util.updateQueryData("getCart", null, (draft) => {
    //         const item = draft.cartItems.find(
    //           (item) => item.id === data.cartItemsId
    //         );
    //         if (item) {
    //           item.quantity = data.quantity;
    //         }
    //       })
    //     );

    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    // }),
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

      async onQueryStarted(cartId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", null, (draft) => {
            const index = draft.cartItems.findIndex(
              (item) => item.id === cartId
            );
            if (index !== -1) {
              draft.cartItems.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
} = cartApi;

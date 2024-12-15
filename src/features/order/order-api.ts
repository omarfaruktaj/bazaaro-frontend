import { baseApi } from "@/redux/api/base-api";
import { Order } from "@/types";
import { Pagination } from "@/types/response";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      {
        orders: Order[];
        pagination: Pagination;
      },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/orders",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["ORDER"],
      transformResponse: (response: {
        data: Order[];
        pagination: Pagination;
      }) => ({
        orders: response.data,
        pagination: response.pagination,
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ORDER"],
    }),

    // updateOrder: builder.mutation<
    //   Response<Order>,
    //   {
    //     data: UpdateOrderSchemaType & { shopId: string };
    //     orderId: string;
    //   }
    // >({
    //   query: ({ data, orderId }) => ({
    //     url: `/orders/${orderId}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["ORDER"],
    // }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi;

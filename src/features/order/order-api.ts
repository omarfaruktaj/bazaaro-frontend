import { baseApi } from "@/redux/api/base-api";
import { Order } from "@/types";
import { Pagination } from "@/types/response";

type OrderQueryArg = {
  page?: number;
  limit?: number;
  sort?: string;
  include?: string;
};

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      {
        orders: Order[];
        pagination: Pagination;
      },
      OrderQueryArg
    >({
      query: ({ sort, include, page = 1, limit = 10 }) => ({
        url: "/orders",
        params: {
          sort,
          include,
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
      invalidatesTags: ["ORDER", "CART"],
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

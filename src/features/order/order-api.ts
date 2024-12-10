import { baseApi } from "@/redux/api/base-api";
import { Order } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], null>({
      query: () => ({
        url: "/orders",
      }),
      providesTags: ["ORDER"],
      transformResponse: (response: { data: Order[] }) => response.data,
    }),

    // createOrder: builder.mutation<
    //   Response<Order>,
    //   OrderSchemaType & { shopId: string }
    // >({
    //   query: (data) => ({
    //     url: "/orders",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["ORDER"],
    // }),

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

export const { useGetOrdersQuery } = orderApi;

import { baseApi } from "@/redux/api/base-api";
import { Payment } from "@/types";
import { Pagination } from "@/types/response";

type PaymentQueryArg = {
  page?: number;
  limit?: number;
  sort?: string;
  include?: string;
};

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<{ clientSecret: string }, null>({
      query: () => ({
        url: "/payments/create-payment-intent",
        method: "POST",
      }),
      transformResponse: (response: { data: string }) => {
        return { clientSecret: response.data };
      },
    }),
    getPayments: builder.query<
      { payments: Payment[]; pagination: Pagination },
      PaymentQueryArg
    >({
      query: ({
        sort,

        include,
        page = 1,
        limit = 10,
      }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: { [key: string]: any } = {
          page,
          limit,
          sort,
          include,
        };

        return {
          params,
          url: `/payments`,
        };
      },
      providesTags: ["PRODUCT"],
      transformResponse: (response: {
        data: Payment[];
        pagination: Pagination;
      }) => ({
        payments: response.data,
        pagination: response.pagination,
      }),
    }),
  }),
});

export const { useGetPaymentsQuery, useCreatePaymentIntentMutation } =
  paymentApi;

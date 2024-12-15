import { baseApi } from "@/redux/api/base-api";

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
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;

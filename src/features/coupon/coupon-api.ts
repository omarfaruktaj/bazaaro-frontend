import { baseApi } from "@/redux/api/base-api";
import { Coupon } from "@/types";
import { Response } from "@/types/response";
import { CouponSchemaType, UpdateCouponSchemaType } from "./schemas";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query<Coupon[], null>({
      query: () => ({
        url: "/coupons",
      }),
      providesTags: ["COUPON"],
      transformResponse: (response: { data: Coupon[] }) => response.data,
    }),

    createCoupon: builder.mutation<Response<Coupon>, CouponSchemaType>({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["COUPON"],
    }),

    updateCoupon: builder.mutation<
      Response<Coupon>,
      {
        data: UpdateCouponSchemaType;
        couponId: string;
      }
    >({
      query: ({ data, couponId }) => ({
        url: `/coupons/${couponId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["COUPON"],
    }),

    deleteCoupon: builder.mutation<Response<Coupon>, string>({
      query: (couponId) => ({
        url: `/coupons/${couponId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COUPON"],
    }),
    applyCoupon: builder.mutation<
      { coupon: Coupon },
      { couponCode: string; shopId: string }
    >({
      query: ({ couponCode, shopId }) => ({
        url: `/coupons/apply`,
        method: "PUT",
        body: {
          code: couponCode,
          shopId: shopId,
        },
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
} = couponApi;

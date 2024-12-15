import { baseApi } from "@/redux/api/base-api";
import { Review } from "@/types";
import { Response } from "@/types/response";
import { ReviewSchemaType, UpdateReviewSchemaType } from "./schemas";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], null>({
      query: () => ({
        url: "/reviews",
      }),
      providesTags: ["REVIEW"],
      transformResponse: (response: { data: Review[] }) => response.data,
    }),

    createReview: builder.mutation<
      Response<Review>,
      { data: ReviewSchemaType; productId: string }
    >({
      query: ({ data, productId }) => ({
        url: `/reviews/${productId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["REVIEW"],
    }),

    updateReview: builder.mutation<
      Response<Review>,
      {
        data: UpdateReviewSchemaType;
        reviewId: string;
      }
    >({
      query: ({ data, reviewId }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["REVIEW"],
    }),

    deleteReview: builder.mutation<Response<Review>, string>({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["REVIEW"],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;

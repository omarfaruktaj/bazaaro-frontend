import { baseApi } from "@/redux/api/base-api";
import { Review } from "@/types";
import { Pagination, Response } from "@/types/response";
import { ReviewSchemaType, UpdateReviewSchemaType } from "./schemas";

type ReviewQueryArg = {
  page?: number;
  limit?: number;
  sort?: string;
  include?: string;
};

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<
      {
        reviews: Review[];
        pagination: Pagination;
      },
      ReviewQueryArg
    >({
      query: ({ sort, include, page = 1, limit = 10 }) => ({
        url: "/reviews",
        params: {
          sort,
          include,
          page,
          limit,
        },
      }),
      providesTags: ["REVIEW"],
      transformResponse: (response: {
        data: Review[];
        pagination: Pagination;
      }) => ({
        reviews: response.data,
        pagination: response.pagination,
      }),
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

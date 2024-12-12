import { baseApi } from "@/redux/api/base-api";
import { User } from "@/types";
import { Pagination, Response } from "@/types/response";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query: () => ({ url: "/users/me" }),
      transformResponse: (result: { data: User }) => result.data,

      providesTags: ["USER"],
    }),

    getUsers: builder.query<
      { users: User[]; pagination: Pagination },
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/users",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["USER"],
      transformResponse: (response: {
        data: User[];
        pagination: Pagination;
      }) => ({
        users: response.data,
        pagination: response.pagination,
      }),
    }),

    changeStatus: builder.mutation<Response<User>, string>({
      query: (userId) => ({
        url: `/users/change-status/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    deleteUser: builder.mutation<Response<User>, string>({
      query: (productId) => ({
        url: `/users/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUsersQuery,
  useChangeStatusMutation,
  useDeleteUserMutation,
} = userApi;

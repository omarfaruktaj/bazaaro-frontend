import { baseApi } from "@/redux/api/base-api";
import { User } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query: () => ({ url: "/users/me" }),
      transformResponse: (result: { data: User }) => result.data,

      providesTags: ["USER"],
    }),
  }),
});

export const { useGetMeQuery } = userApi;

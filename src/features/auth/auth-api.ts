import { baseApi } from "@/redux/api/base-api";
import { User } from "@/types";
import { Response } from "@/types/response";
import { TSignUpSchema } from "./schemas";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<Response<User>, TSignUpSchema>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useSignupMutation } = authApi;

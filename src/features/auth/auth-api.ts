import { baseApi } from "@/redux/api/base-api";
import { User } from "@/types";
import { Response } from "@/types/response";
import {
  TForgotPasswordSchema,
  TLoginSchema,
  TResetPasswordSchema,
  TSignUpSchema,
} from "./schemas";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<Response<User>, TSignUpSchema>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<Response<User>, TLoginSchema>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<null, TForgotPasswordSchema>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      null,
      { data: TResetPasswordSchema; token: string }
    >({
      query: ({ data, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

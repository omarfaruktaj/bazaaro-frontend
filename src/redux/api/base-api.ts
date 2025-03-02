import envConfig from "@/config/env-config";
import { logOut, setToken, setUser } from "@/features/auth/auth-slice";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { RootState } from "../store";

const BASE_URL = envConfig.BASE_API;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    return data?.data?.accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log(result);
    console.log("Access token expired. Attempting to refresh token...");

    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setUser(user));
      api.dispatch(setToken({ accessToken: newAccessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      toast.error("Session expired. Please log in again.");
    }
  }

  // // Handle other errors
  // if (result?.error) {
  //   const { status, data } = result.error;
  //   if (status === 403) {
  //     toast.error(data?.message || "Forbidden access.");
  //   } else if (status === 404) {
  //     toast.error(data?.message || "Resource not found.");
  //   }
  // }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithRefreshToken,
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: [
    "USER",
    "PRODUCT",
    "CATEGORY",
    "SHOP",
    "ORDER",
    "REVIEW",
    "COUPON",
    "CART",
  ],
});

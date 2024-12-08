import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const baseApi = createApi({
  baseQuery,
  reducerPath: "api",
  endpoints: () => ({}),
});

import { baseApi } from "@/redux/api/base-api";
import { Category } from "@/types";
import { Response } from "@/types/response";
import { CategorySchemaType } from "./schemas";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], null>({
      query: () => ({
        url: "/categories",
      }),
      providesTags: ["CATEGORY"],
      transformResponse: (response: { data: Category[] }) => response.data,
    }),

    createCategory: builder.mutation<Response<Category>, CategorySchemaType>({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CATEGORY"],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;

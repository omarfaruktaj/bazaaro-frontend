import { baseApi } from "@/redux/api/base-api";
import { Category } from "@/types";
import { Response } from "@/types/response";
import { CategorySchemaType, UpdateCategorySchemaType } from "./schemas";

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
    updateCategory: builder.mutation<
      Response<Category>,
      {
        data: UpdateCategorySchemaType;
        categoryId: string;
      }
    >({
      query: ({ data, categoryId }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CATEGORY"],
    }),

    deleteCategory: builder.mutation<Response<Category>, string>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CATEGORY"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

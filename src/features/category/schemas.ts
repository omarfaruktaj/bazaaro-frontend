import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z.string().optional(),
});

export const UpdateCategorySchema = CategorySchema.partial();

export type CategorySchemaType = z.infer<typeof CategorySchema>;
export type UpdateCategorySchemaType = z.infer<typeof UpdateCategorySchema>;

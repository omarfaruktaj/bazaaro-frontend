import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  quantity: z.coerce
    .number()
    .int({ message: "Quantity must be an integer" })
    .min(1, { message: "Quantity must be at least 1" }),
  images: z.array(z.string().url({ message: "Invalid image URL" })),
  discount: z.coerce
    .number()
    .min(0, { message: "Discount cannot be negative" })
    .max(100, { message: "Discount cannot exceed 100%" })
    .optional(),
  categoryId: z.string().uuid(),
});

export const UpdateProductSchema = ProductSchema.partial();

export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type UpdateProductSchemaType = z.infer<typeof UpdateProductSchema>;

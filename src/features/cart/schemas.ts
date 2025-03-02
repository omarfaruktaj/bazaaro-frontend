import { z } from "zod";

export const CartSchema = z.object({
  // shopId: z.string().uuid("Please provide a valid shopId."),
  productId: z.string().uuid("Please provide a valid productId."),
  quantity: z
    .number()
    .int("Quantity must be an integer.")
    .positive("Quantity must be greater than zero.")
    .optional(),
});
export const UpdateQuantitySchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be an integer.")
    .positive("Quantity must be greater than zero.")
    .optional(),
});
export type CartSchemaType = z.infer<typeof CartSchema>;

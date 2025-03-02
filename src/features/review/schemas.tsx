import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Please provide a rating between 1 and 5." })
    .max(5, { message: "Rating cannot be more than 5." }),
  review: z
    .string()
    .min(1, { message: "Please share your experience with this product." }),
});

export const ReviewResponseSchema = z.object({
  response: z.string().min(1, { message: "Response cannot be empty." }),
});

export const UpdateReviewSchema = ReviewSchema.partial();

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;
export type UpdateReviewSchemaType = z.infer<typeof UpdateReviewSchema>;
export type ReviewResponseSchemaType = z.infer<typeof ReviewResponseSchema>;

import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required and cannot be empty." }),

  address: z
    .string()
    // .min(1, { message: "Address, if provided, must be a non-empty string." })
    .optional(),
  phone: z
    .string()
    // .regex(/^(\+\d{1,3}[- ]?)?\(?\d{1,4}\)?[- ]?\d{1,4}[- ]?\d{1,4}$/, {
    //   message: "Phone number is invalid. Please use a valid phone format.",
    // })
    .optional(),
  bio: z
    .string()
    // .max(500, { message: "Bio cannot exceed 500 characters." })
    .optional(),
  avatar: z.string().optional(),
  //   .url({ message: "Avatar must be a valid URL." })
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

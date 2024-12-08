import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name must be less than 50 characters." }),

  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(100, { message: "Email must be less than 100 characters." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be less than 100 characters." }),
});
export const vendorSignUpSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(100, { message: "Email must be less than 100 characters." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be less than 100 characters." }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(100, { message: "Email must be less than 100 characters." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be less than 100 characters." }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .max(100, { message: "Email must be less than 100 characters." }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password must be less than 100 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100, { message: "Password must be less than 100 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: "Current password must be at least 6 characters long." })
    .max(100, {
      message: "Current password must be less than 100 characters.",
    }),
  newPassword: z
    .string()
    .min(6, { message: "New password must be at least 6 characters long." })
    .max(100, { message: "New password must be less than 100 characters." }),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TVendorSignUpSchema = z.infer<typeof vendorSignUpSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

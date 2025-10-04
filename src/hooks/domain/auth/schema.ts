import { z } from "zod";

// Use your existing schema
export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    alias: z
      .string()
      .min(2, "Alias must be at least 2 characters")
      .max(100, "Alias must not exceed 100 characters"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    marketing_opt_in: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpData = z.infer<typeof signUpSchema>;

// Zod Schema
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export type SignInData = z.infer<typeof signInSchema>;

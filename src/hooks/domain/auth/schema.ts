import { z } from "zod";

// Staff Sign Up Schema
export const signUpSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  alias: z
    .string()
    .min(2, "Alias must be at least 2 characters")
    .max(100, "Alias must not exceed 100 characters"),
  orgCode: z.string().min(1, "Organization code is required"),
});

// Infer TypeScript types from schemas
export type SignUpData = z.infer<typeof signUpSchema>;

import { z } from "zod";

// Staff Sign Up Schema
export const staffSignUpSchema = z.object({
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
  organizationCode: z.string().min(1, "Organization code is required"),
});

// Staff Schema (for database records)
export const staffSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  full_name: z.string(),
  counter: z.string().optional().nullable(),
  org_code: z.string(),
  role: z.enum(["staff", "admin", "supervisor"]),
  status: z.enum(["active", "inactive", "break", "pending"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Update Staff Schema
export const updateStaffSchema = z.object({
  id: z.string().uuid("Invalid staff ID"),
  full_name: z.string().min(2).max(100).optional(),
  counter: z.string().optional(),
  status: z.enum(["active", "inactive", "break", "pending"]).optional(),
  role: z.enum(["staff", "admin", "supervisor"]).optional(),
});

// Staff ID Schema (for approve/reject/delete operations)
export const staffIdSchema = z.string().uuid("Invalid staff ID");

// Infer TypeScript types from schemas
export type StaffSignUpData = z.infer<typeof staffSignUpSchema>;
export type Staff = z.infer<typeof staffSchema>;
export type UpdateStaffData = z.infer<typeof updateStaffSchema>;

// Additional schemas for specific operations

// Staff Login Schema
export const staffLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type StaffLoginData = z.infer<typeof staffLoginSchema>;

// Staff Filter Schema (for queries)
export const staffFilterSchema = z.object({
  organizationCode: z.string().optional(),
  status: z.enum(["active", "inactive", "break", "pending"]).optional(),
  role: z.enum(["staff", "admin", "supervisor"]).optional(),
  search: z.string().optional(),
});

export type StaffFilterData = z.infer<typeof staffFilterSchema>;

// Change Password Schema
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;

// Staff Request Approval Schema
export const staffRequestActionSchema = z.object({
  staffId: z.string().uuid("Invalid staff ID"),
  action: z.enum(["approve", "reject"]),
  reason: z.string().optional(), // Optional reason for rejection
});

export type StaffRequestActionData = z.infer<typeof staffRequestActionSchema>;

import z from "zod";

// Zod Schema for Organization Creation
export const createOrgSchema = z.object({
  logo: z.string().optional(),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters"),
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must not exceed 20 characters")
    .regex(/^[a-z0-9-]+$/, "Code must be lowercase, numbers, and hyphens only")
    .transform((val) => val.toLowerCase()),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  industry: z.string().min(1, "Please select an industry"),
});

export type CreateOrgData = z.infer<typeof createOrgSchema>;

export const OrgSchema = z
  .object({
    id: z.number().int().nonnegative(),
    code: z.string().min(1),
    name: z.string().min(1),
    industry: z.string().nullable().optional(), // industry may be null or missing
    description: z.string().nullable(), // explicit null or string
    logo: z.string().nullable(), // explicit null or string (e.g. URL or base64)
    created_at: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "created_at must be a valid ISO timestamp string",
    }),
    updated_at: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "updated_at must be a valid ISO timestamp string",
    }),
    org_role: z.string(),
  })
  .strict();

/**
 * User ↔ Org membership schema (top-level)
 */
export const UserOrgSchema = z
  .object({
    id: z.number().int().nonnegative(),
    user_id: z.string().uuid(),
    org_id: z.number().int().nonnegative(),
    org_role: z.enum(["admin", "member", "viewer"]),
    created_at: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
      message: "created_at must be a valid ISO timestamp string",
    }),
    // embedded organization (as you provided)
    org: OrgSchema,
  })
  .strict();

/** Types */
export type Org = z.infer<typeof OrgSchema>;
export type UserOrg = z.infer<typeof UserOrgSchema>;

import z from "zod";

export const PurposeSchema = z
  .object({
    id: z.number().int().nonnegative(),
    name: z.string().min(1),
    org_code: z.string(),
    sort_order: z.number(),
    description: z.string(),
    estimated_time_in_minutes: z.string(),
    is_active: z.boolean(),
  })
  .strict();

/** Types */
export type Purpose = z.infer<typeof PurposeSchema>;

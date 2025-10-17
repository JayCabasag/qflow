import z from "zod";

export const staffSchema = z.object({
  id: z.number(),
  org_id: z.number(),
  user_id: z.string(),
  name: z.string(),
  assign: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export type Staff = z.infer<typeof staffSchema>;

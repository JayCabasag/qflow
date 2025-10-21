"use server";

import { validatedAction } from "@/lib/auth/middleware";
import { createClient } from "@/utils/supabase/server";
import z from "zod";

const createOrgSchema = z.object({
  logo: z.string().nullable(),
  code: z.string().min(1, "Org code is required").trim(),
  name: z.string().min(1, "Purpose name is required").trim(),
  industry: z.string().min(1, "Purpose name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
});

export const createOrg = validatedAction(createOrgSchema, async (formData) => {
  const { logo, code, name, industry, description } = formData;

  const supabase = await createClient();

  const { data: existingOrg } = await supabase
    .from("org")
    .select("code")
    .eq("code", code)
    .single();

  if (existingOrg) {
    return {
      error: "Organization code is already taken",
      logo,
      code,
      name,
      industry,
      description,
    };
  }

  const { data, error } = await supabase
    .from("org")
    .insert({
      name: name,
      code: code,
      description: description || null,
      industry: industry || null,
      logo: logo || null,
    })
    .select()
    .single();

  if (error) {
    return {
      error: error.message,
      logo,
      code,
      name,
      industry,
      description,
    };
  }

  return { success: "success", data };
});

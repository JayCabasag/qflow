"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type CreateOrgData = {
  name: string;
  code: string;
  description?: string;
  industry: string;
  logo?: string;
};

export async function createOrg(data: CreateOrgData) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "You must be authenticated to create an organization" };
  }

  // Check if organization code already exists
  const { data: existingOrg } = await supabase
    .from("org")
    .select("code")
    .eq("code", data.code)
    .single();

  if (existingOrg) {
    return { error: "Organization code is already taken" };
  }

  // Insert the new organization
  const { error } = await supabase
    .from("org")
    .insert({
      name: data.name,
      code: data.code,
      description: data.description || null,
      industry: data.industry,
      logo: data.logo || null,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function getUserOrgs() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase.from("user_orgs_view").select("*");

  if (error) throw error;

  return data;
}

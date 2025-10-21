"use server";

import { validatedAction } from "@/lib/auth/middleware";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const addPurposeSchema = z.object({
  orgCode: z.string().min(1, "Org code is required").trim(),
  name: z.string().min(1, "Purpose name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  estimatedTimeInMinutes: z.coerce
    .number()
    .min(1, "Estimated time must be at least 1 minute"),
});

export const addPurpose = validatedAction(
  addPurposeSchema,
  async (formData) => {
    const { orgCode, name, description, estimatedTimeInMinutes } = formData;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ticket_purpose")
      .insert({
        org_code: orgCode,
        name: name,
        description: description,
        estimated_time_in_minutes: estimatedTimeInMinutes,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return {
        error: error.message,
        orgCode,
        name,
        description,
        estimatedTimeInMinutes,
      };
    }

    if (error) {
      console.error("Error creating purpose:", error);
      throw error;
    }

    return { success: "success", data };
  }
);

const removePurposeSchema = z.object({
  id: z.string(),
});

export const removePurpose = validatedAction(
  removePurposeSchema,
  async (formData) => {
    const { id } = formData;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ticket_purpose")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return { error: error.message };
    }

    if (data.length <= 0) {
      return { error: "Failed to remove purpose" };
    }

    return { success: "success", message: "purpose removed successfully" };
  }
);

const addStaffSchema = z.object({
  orgId: z.coerce.number(),
  userId: z.string().min(3, "Invalid user id.".trim()),
  name: z.string().min(1, "Staff name is required").trim(),
  assign: z.string().min(1, "Assign is required"),
  role: z.enum(["admin", "staff"] as const, {
    message: "Role must be either admin or staff",
  }),
});

export const addStaff = validatedAction(addStaffSchema, async (formData) => {
  const { orgId, userId, name, assign, role } = formData;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_org")
    .insert({
      org_id: orgId,
      user_id: userId,
      name,
      assign,
      status: "active",
      org_role: role,
    })
    .select()
    .single();

  if (error) {
    return {
      error: error.message,
      orgId,
      name,
      userId,
      assign,
    };
  }

  return { success: "success", data };
});

const removeStaffSchema = z.object({
  id: z.string(),
});

export const removeStaff = validatedAction(
  removeStaffSchema,
  async (formData) => {
    const { id } = formData;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("user_org")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return { error: error.message };
    }

    if (data.length <= 0) {
      return { error: "Failed to remove staff" };
    }

    return { success: "success", message: "staff removed successfully" };
  }
);

const removeOrgSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  password: z.string(),
});

export const removeOrg = validatedAction(removeOrgSchema, async (formData) => {
  const { id, name, password } = formData;

  const supabase = await createClient();

  // Step 1: Get the current authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: "Unauthorized: You must be logged in",
      id,
      name,
      password,
    };
  }

  console.log(formData, user.id);

  // Step 2: Verify the user is an admin of this organization
  const { data: orgAdmin, error: adminCheckError } = await supabase
    .from("user_org")
    .select("*, org:org_id!inner(*)")
    .eq("org_id", id)
    .eq("user_id", user.id)
    .eq("org_role", "admin")
    .single();

  if (adminCheckError || !orgAdmin) {
    return {
      error: "Unauthorized: You are not an admin of this organization",
      id,
      name,
      password,
    };
  }

  // Step 3: Verify the organization name matches (additional safety check)
  if (orgAdmin.org?.name !== name) {
    return {
      error: "Organization name does not match. Please verify and try again.",
      id,
      name,
      password,
    };
  }

  // Step 4: Verify the password by attempting to sign in
  const { error: passwordError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: password,
  });

  if (passwordError) {
    return {
      error: "Invalid password. Please check your password and try again.",
      id,
      name,
      password,
    };
  }

  // Step 5: Proceed with deletion - Delete the organization
  const { data: deletedOrg, error: deleteError } = await supabase
    .from("org")
    .delete()
    .eq("id", orgAdmin.org.id)
    .select();

  if (deleteError) {
    console.log(deleteError);
    return {
      error: `Failed to delete organization: ${deleteError.message}`,
      id,
      name,
      password,
    };
  }

  if (!deletedOrg || deletedOrg.length === 0) {
    return {
      error: "Failed to delete organization",
      id,
      name,
      password,
    };
  }

  // Step 6: Delete all in parallel using Promise.allSettled for better error handling
  await Promise.allSettled([
    supabase.from("user_org").delete().eq("org_id", orgAdmin.org.id),
    supabase.from("ticket").delete().eq("org_id", orgAdmin.org.id),
    supabase.from("ticket_purpose").delete().eq("org_id", orgAdmin.org.id),
  ]);

  return {
    success: "success",
    message: `Organization "${name}" has been permanently deleted`,
  };
});

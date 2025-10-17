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
      .from("purpose")
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
    try {
      const { id } = formData;

      const supabase = await createClient();

      const { data, error } = await supabase
        .from("purpose")
        .delete()
        .eq("id", id)
        .select();

      if (error) {
        return { error: "Failed to remove purpose" };
      }

      if (data.length <= 0) {
        return { error: "Failed to remove purpose" };
      }

      return { success: "success", message: "purpose removed successfully" };
    } catch (error) {
      return { error: "Failed to remove purpose" };
    }
  }
);

const addStaffSchema = z.object({
  orgCode: z.string(),
  userId: z.string().min(3, "Invalid user id.".trim()),
  name: z.string().min(1, "Staff name is required").trim(),
  assign: z.string().min(1, "Assign is required"),
});

export const addStaff = validatedAction(addStaffSchema, async (formData) => {
  const { orgCode, userId, name, assign } = formData;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("org_staff")
    .insert({
      org_code: orgCode,
      user_id: userId,
      name,
      assign,
      status: "active",
    })
    .select()
    .single();

  if (error) {
    return {
      error: error.message,
      orgCode,
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
    try {
      const { id } = formData;

      const supabase = await createClient();

      const { data, error } = await supabase
        .from("org_staff")
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
    } catch (error) {
      return { error: "Failed to remove staff" };
    }
  }
);

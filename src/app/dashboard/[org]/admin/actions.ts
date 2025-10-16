"use server";

import { validatedAction } from "@/lib/auth/middleware";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
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

    // Just insert normally - sort_order is auto-set by the trigger!
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

export async function togglePurposeStatus(purposeId: string) {
  try {
    // TODO: Toggle status in database
    // await db.purpose.update({
    //   where: { id: purposeId },
    //   data: { isActive: !current.isActive }
    // })

    revalidatePath("/your-path");
    return { success: true };
  } catch (error) {
    return { error: "Failed to toggle purpose status" };
  }
}

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

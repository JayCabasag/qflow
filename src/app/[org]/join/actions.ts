"use server";

import { validatedAction } from "@/lib/auth/middleware";
import { createClient } from "@/utils/supabase/server";
import z from "zod";
import { parsePhoneNumberWithError, ParseError } from "libphonenumber-js";

const joinQueueSchema = z.object({
  orgCode: z.string(),
  name: z.string().min(1, "Name is required"),
  phoneCountryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(1, "Phone number is required"),
  purposeId: z.string().transform(Number),
  userOrgId: z.string().transform(Number).optional(),
});

export const joinQueue = validatedAction(joinQueueSchema, async (formData) => {
  const { orgCode, name, phoneCountryCode, phone, purposeId, userOrgId } =
    formData;
  try {
    const fullPhoneNumber = `${phoneCountryCode}${phone}`;
    let phoneNumber;
    let formattedPhone;
    let countryCode;

    try {
      phoneNumber = parsePhoneNumberWithError(fullPhoneNumber);
      if (!phoneNumber.isValid()) {
        return {
          error: "Invalid phone number for the selected country",
          name,
          phoneCountryCode,
          phone,
          purposeId: purposeId.toString(),
          userOrgId: userOrgId?.toString(),
        };
      }

      formattedPhone = phoneNumber.formatInternational();
      countryCode = phoneNumber.country;
    } catch (error) {
      if (error instanceof ParseError) {
        let errorMessage = "Invalid phone number format";

        switch (error.message) {
          case "NOT_A_NUMBER":
            errorMessage = "Please enter a valid phone number";
            break;
          case "INVALID_COUNTRY":
            errorMessage = "Invalid country code selected";
            break;
          case "TOO_SHORT":
            errorMessage = "Phone number is too short";
            break;
          case "TOO_LONG":
            errorMessage = "Phone number is too long";
            break;
          default:
            errorMessage = `Phone number error: ${error.message}`;
        }

        return {
          error: errorMessage,
          name,
          phoneCountryCode,
          phone,
          purposeId: purposeId.toString(),
          userOrgId: userOrgId?.toString(),
        };
      }
      throw error;
    }

    const supabase = await createClient();

    const { data: existingOrg, error: orgError } = await supabase
      .from("org")
      .select("id")
      .eq("code", orgCode)
      .single();

    if (!existingOrg || orgError) {
      return {
        error: "Organization does not exist",
        name,
        phoneCountryCode,
        phone,
        purposeId: purposeId.toString(),
        userOrgId: userOrgId?.toString(),
      };
    }

    // Insert into tickets table (replace 'tickets' with your actual table name)
    const { data, error } = await supabase
      .from("tickets") // Replace with your actual table name
      .insert({
        org_id: existingOrg.id,
        ticket_purpose_id: purposeId,
        user_org_id: userOrgId,
        name: name,
        phone: formattedPhone, // Store formatted international number
        phone_country_code: countryCode, // Store country code (e.g., 'US', 'PH')
      })
      .select()
      .single();

    if (error) {
      return {
        error: error.message,
        name,
        phoneCountryCode,
        phone,
        purposeId: purposeId.toString(),
        userOrgId: userOrgId?.toString(),
      };
    }

    return { success: "success", data };
  } catch (error) {
    // Catch any other unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      error: errorMessage,
      name,
      phoneCountryCode,
      phone,
      purposeId: purposeId.toString(),
      userOrgId: userOrgId?.toString(),
    };
  }
});

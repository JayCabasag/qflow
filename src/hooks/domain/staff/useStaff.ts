import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StaffSignUpData } from "./schema";
import { toast } from "sonner";

// Query Keys
export const enum StaffKeys {
  fetchStaff = "fetchStaff",
  fetchStaffById = "fetchStaffById",
  fetchStaffRequests = "fetchStaffRequests",
}

// Hook for staff sign up
export function useStaffSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signUpData: StaffSignUpData) => {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            name: signUpData.name,
            alias: signUpData.alias,
            org_code: signUpData.organizationCode,
          },
          //   emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Create staff record in your staff table
      if (data.user) {
        const { error: staffError } = await supabase.from("user").insert({
          id: data.user.id,
          email: signUpData.email,
          name: signUpData.name,
          alias: signUpData.alias,
          org_code: signUpData.organizationCode,
          status: "pending",
        });

        if (staffError) {
          throw new Error(staffError.message);
        }
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [StaffKeys.fetchStaff] });
      queryClient.invalidateQueries({
        queryKey: [StaffKeys.fetchStaffRequests],
      });

      toast.success("Staff Sign Up Successful", {
        description: "A verification email has been sent.",
      });
    },
    onError: (error: Error) => {
      toast.error("Sign Up Failed", {
        description: error.message,
      });
    },
  });
}

export const useStaff = () => {
  return { useStaffSignUpMutation };
};

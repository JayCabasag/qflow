import { supabase } from "@/lib/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { SignUpData } from "./schema";

// Hook for staff sign up
export function useSignUpMutation() {
  return useMutation({
    mutationFn: async (signUpData: SignUpData) => {
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            name: signUpData.name,
            alias: signUpData.alias,
            org_code: signUpData.orgCode,
          },
          //   emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}

export const useAuth = () => {
  return { useSignUpMutation };
};

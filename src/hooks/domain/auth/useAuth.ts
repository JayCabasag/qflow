import { supabase } from "@/lib/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { SignInData, SignUpData } from "./schema";
import { signIn, signOut } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

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
            marketing_opt_in: signUpData.marketing_opt_in,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
}

// Hook for staff sign up
export function useSignInMutation() {
  return useMutation({
    mutationFn: async (signInData: SignInData) => {
      const result = await signIn(signInData.email, signInData.password);

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
  });
}

// Sign Out Mutation
export function useSignOutMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const result = await signOut();

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      router.refresh();
    },
  });
}

export const useAuth = () => {
  return { useSignUpMutation, useSignInMutation };
};

"use server";

import { validatedAction } from "@/lib/auth/middleware";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import z from "zod";

// Sign in

const signInSchema = z.object({
  email: z.email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data) => {
  const { email, password } = data;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
      email,
      password,
    };
  }

  redirect("/dashboard");
});

// Sign Up
const signUpSchema = z
  .object({
    email: z.email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters"),
    alias: z
      .string()
      .min(2, "Alias must be at least 2 characters")
      .max(100, "Alias must not exceed 100 characters"),
    terms: z.string(), // Just accept string, no transform
    marketingOptIn: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signUp = validatedAction(signUpSchema, async (data) => {
  const {
    email,
    password,
    confirmPassword,
    name,
    alias,
    terms,
    marketingOptIn,
  } = data;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        alias,
        marketing_opt_in: marketingOptIn,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: error.message,
      email,
      password,
      confirmPassword,
      name,
      alias,
      terms,
      marketingOptIn,
    };
  }

  redirect(`/auth/verify-email?email=${data.email}`);
});

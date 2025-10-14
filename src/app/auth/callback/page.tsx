"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      const supabase = createClient();
      supabase.auth
        .setSession({
          access_token,
          refresh_token: refresh_token,
        })
        .then(() => {
          router.replace("/dashboard");
        });
    } else {
      router.replace("/auth/auth-code-error");
    }
  }, [router]);

  return <p>Signing you in...</p>;
}

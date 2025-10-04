"use client";

import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  console.log("Please verify your email");
  return <div>Verify email</div>;
}

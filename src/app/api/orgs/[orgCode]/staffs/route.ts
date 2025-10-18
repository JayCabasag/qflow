"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orgCode: string }> }
) {
  try {
    const { orgCode } = await params;
    const supabase = await createClient();

    const { data: purposes, error: error } = await supabase
      .from("user_org")
      .select(
        `
          *,
          org:org_id (
            code,
            name,
            logo
          )
        `
      )
      .eq("org.code", orgCode)
      .eq("org_role", "staff")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ purposes });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to fetch purposes" },
      { status: 500 }
    );
  }
}

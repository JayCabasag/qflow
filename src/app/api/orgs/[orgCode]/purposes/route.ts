"use server";

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orgCode: string }> }
) {
  try {
    const { orgCode } = await params;

    // Initialize Supabase server client
    const supabase = await createClient();

    // Fetch purposes for this org
    const { data: purposes, error: error } = await supabase
      .from("purpose")
      .select("*")
      .eq("org_code", orgCode)
      .order("name", { ascending: true });

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

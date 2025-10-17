import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Context {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(request: Request, context: Context) {
  try {
    const supabase = await createClient();

    const { userId } = await context.params;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: orgs, error } = await supabase
      .from("user_orgs_view")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(orgs);
  } catch (error) {
    console.error("Error fetching orgs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

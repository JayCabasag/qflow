"use server";

import { StaffBoard } from "@/components/staff-board";
import { supabase } from "@/lib/supabaseClient";
import { QueueItem } from "@/types";

export default async function StaffPage({
  params,
}: {
  params: { org: string };
}) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  return <StaffBoard org={org} />;
}

"use server";

import { StaffBoard } from "@/components/staff-board";
import { supabase } from "@/lib/supabaseClient";
import { QueueItem, Stats } from "@/types";

export default async function StaffPage({
  params,
}: {
  params: { org: string };
}) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  const { data: allQueues, error: allQueuesError } = await supabase.rpc(
    "get_queues_by_status",
    { org_code: org }
  );

  const { data: stats, error: statsError } = await supabase
    .rpc("get_queue_stats", {
      org_code: org,
    })
    .maybeSingle();

  const waitingQueues =
    allQueues?.filter((q: QueueItem) => q.status === "waiting") ?? [];
  const servingQueues =
    allQueues?.filter((q: QueueItem) => q.status === "serving") ?? [];
  const completedQueues =
    allQueues?.filter((q: QueueItem) => q.status === "completed") ?? [];

  console.log("Waiting Queues:", waitingQueues);
  console.log("Serving Queues:", servingQueues);
  console.log("Completed Queues:", completedQueues);

  return (
    <StaffBoard
      org={org}
      completedQueues={completedQueues}
      waitingQueues={waitingQueues}
      servingQueues={servingQueues}
      stats={stats as Stats}
    />
  );
}

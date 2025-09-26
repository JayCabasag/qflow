import { QueueDisplay } from "@/components/queue-display";
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";

export default async function OrganizationPage({
  params,
}: {
  params: { org: string };
}) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  const { data: organization, error } = await supabase
    .from("organization")
    .select("*")
    .eq("code", org)
    .maybeSingle();

  const { data: queues, error: queuesError } = await supabase
    .from("queue")
    .select(
      `
        *,
        purpose:purpose_id (
          id,
          name
        )
      `
    )
    .eq("organization_code", org)
    .in("status", ["serving", "waiting"])
    .order("status")
    .order("created_at")
    .limit(50);

  const { data: stats, error: statsError } = await supabase
    .rpc("get_queue_stats", {
      org_code: org,
    })
    .maybeSingle();

  console.log(queuesError);

  if (error || queuesError || statsError) {
    return notFound();
  }

  if (!organization) {
    return <div>No organization found for code: {org}</div>;
  }

  if (!stats) {
    return <div>No stats found for code: {org}</div>;
  }

  return <QueueDisplay org={org} queues={queues} stats={stats as any} />;
}

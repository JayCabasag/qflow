import { getPosts } from "@/api/posts";
import { QueueDisplay } from "@/components/queue-display";
import { supabase } from "@/lib/supabaseClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

export default async function OrganizationPage({
  params,
}: {
  params: { org: string };
}) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  const queryClient = new QueryClient();

  const { data: organization, error } = await supabase
    .from("organization")
    .select("*")
    .eq("code", org)
    .maybeSingle();

  const { data: stats, error: statsError } = await supabase
    .rpc("get_queue_stats", {
      org_code: org,
    })
    .maybeSingle();

  if (error || statsError) {
    return notFound();
  }

  if (!organization) {
    return <div>No organization found for code: {org}</div>;
  }

  if (!stats) {
    return <div>No stats found for code: {org}</div>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueueDisplay org={org} stats={stats as any} />
    </HydrationBoundary>
  );
}

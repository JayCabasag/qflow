"use server";

import { OrgNotReady } from "@/components/org-not-ready";
import { QueueDisplay } from "@/components/queue-display";
import { supabase } from "@/lib/supabase/client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function OrgPage({ params }: { params: { org: string } }) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  const queryClient = new QueryClient();

  const { data: orgData, error } = await supabase
    .from("org")
    .select("*")
    .eq("code", org)
    .maybeSingle();

  await queryClient.prefetchQuery({
    queryKey: ["fetchOneOrg", org],
    queryFn: async () => {
      return orgData;
    },
  });

  if (error || !orgData || orgData.status != "active") {
    return <OrgNotReady />;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueueDisplay org={org} />
    </HydrationBoundary>
  );
}

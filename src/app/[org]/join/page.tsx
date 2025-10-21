"use server";

import { JoinQueue } from "@/components/join-queue";
import { OrgNotReady } from "@/components/org-not-ready";
import { supabase } from "@/lib/supabase/client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface JoinPageProps {
  params: { org: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { org } = await params;
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
      <JoinQueue org={org} />
    </HydrationBoundary>
  );
}

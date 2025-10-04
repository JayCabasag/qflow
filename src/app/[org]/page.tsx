import { QueueDisplay } from "@/components/queue-display";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function OrgPage({ params }: { params: { org: string } }) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueueDisplay org={org} />
    </HydrationBoundary>
  );
}

"use server";

import { OrgList } from "@/components/org-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            My Organizations
          </h2>
          <p className="text-gray-600">
            Select an organization to manage queues and view analytics
          </p>
        </div>
        <OrgList />
      </main>
    </HydrationBoundary>
  );
}

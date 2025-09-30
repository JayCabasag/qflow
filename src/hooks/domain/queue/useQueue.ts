import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { QueueItem, QueuesStats } from "@/types";

export const enum QueuesKey {
  fetchQueues = "fetchQueues",
  fetchQueuesStats = "fetchQueuesStats",
  fetchQueuesByStatus = "fetchQueuesByStatus",
}

export function useFetchQueues(org: string) {
  return useQuery({
    queryKey: [QueuesKey.fetchQueues, org], // Include org in the query key for proper caching
    queryFn: async () => {
      const { data: queues, error } = await supabase
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

      if (error) {
        throw new Error(error.message);
      }

      return queues as QueueItem[];
    },
    enabled: !!org, // Only run the query if org is provided
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: true, // Refetch when user returns to the tab
  });
}

export function useFetchQueuesStats(org: string) {
  return useQuery({
    queryKey: [QueuesKey.fetchQueuesStats, org],
    queryFn: async () => {
      const { data: stats, error } = await supabase
        .rpc("get_queue_stats", {
          org_code: org,
        })
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return stats as QueuesStats;
    },
  });
}

// New optimized hook that fetches all statuses and returns separated data
export function useFetchQueuesByStatus(org: string) {
  return useQuery({
    queryKey: [QueuesKey.fetchQueuesByStatus, org],
    queryFn: async () => {
      const { data: allQueues, error: allQueuesError } = await supabase.rpc(
        "get_queues_by_status",
        { org_code: org }
      );

      if (allQueuesError) {
        throw new Error(allQueuesError.message);
      }

      // Separate queues by status
      const waitingQueues =
        allQueues?.filter((q: QueueItem) => q.status === "waiting") ?? [];
      const servingQueues =
        allQueues?.filter((q: QueueItem) => q.status === "serving") ?? [];
      const completedQueues =
        allQueues?.filter((q: QueueItem) => q.status === "completed") ?? [];

      return {
        allQueues: (allQueues as QueueItem[]) ?? [],
        waitingQueues: waitingQueues as QueueItem[],
        servingQueues: servingQueues as QueueItem[],
        completedQueues: completedQueues as QueueItem[],
      };
    },
    enabled: !!org,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}

export const useQueues = () => {
  return { useFetchQueues, useFetchQueuesStats, useFetchQueuesByStatus };
};

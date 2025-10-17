import { supabase } from "@/lib/supabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Staff } from "./schema";

export const enum StaffKey {
  fetchAllByOrgCodeQuery = "fetchAllStaffByOrgCode",
}

export function useFetchAllByOrgCodeQuery(orgCode: string) {
  return useQuery({
    queryKey: [StaffKey.fetchAllByOrgCodeQuery, orgCode], // Include org in the query key for proper caching
    queryFn: async () => {
      const response = await fetch(`/api/orgs/${orgCode}/staffs`);

      if (!response.ok) {
        throw new Error("Failed to fetch organization purposes");
      }

      const data = await response.json();
      return data.purposes as Staff[];
    },
    enabled: !!orgCode,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}

export const useStaff = () => {
  const client = useQueryClient();
  const invalidateQuery = (queryKeys: StaffKey[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return { useFetchAllByOrgCodeQuery, invalidateQuery };
};

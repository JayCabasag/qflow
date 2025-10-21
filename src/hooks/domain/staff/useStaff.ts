import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Staff } from "./schema";

export const enum StaffKey {
  fetchAllStaffsByOrgCodeQuery = "fetchAllAdminsByOrgCode",
  fetchAllAdminsByOrgCodeQuery = "fetchAllStaffsByOrgCode",
}

export function useFetchAllStaffsByOrgCodeQuery(orgCode: string) {
  return useQuery({
    queryKey: [StaffKey.fetchAllStaffsByOrgCodeQuery, orgCode], // Include org in the query key for proper caching
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

export function useFetchAllAdminsByOrgCodeQuery(orgCode: string) {
  return useQuery({
    queryKey: [StaffKey.fetchAllAdminsByOrgCodeQuery, orgCode], // Include org in the query key for proper caching
    queryFn: async () => {
      const response = await fetch(`/api/orgs/${orgCode}/admins`);

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

  return {
    useFetchAllStaffsByOrgCodeQuery,
    useFetchAllAdminsByOrgCodeQuery,
    invalidateQuery,
  };
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Org, UserOrg } from "./schema";
import { supabase } from "@/lib/supabase/client";

export const enum OrgKeys {
  fetchOne = "fetchOneOrg",
  fetchAllByUserIdQuery = "fetchAllByUserIdQuery",
}

const useFetchOneQuery = (org: string) => {
  return useQuery({
    queryKey: [OrgKeys.fetchOne, org],
    queryFn: async () => {
      const { data: organization, error } = await supabase
        .from("org")
        .select("*")
        .eq("code", org)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return organization as Org;
    },
  });
};

const useFetchAllByUserIdQuery = (userId: string) => {
  return useQuery({
    queryKey: [OrgKeys.fetchAllByUserIdQuery],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}/orgs`);

      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const orgs = await response.json();
      return orgs as UserOrg[];
    },
  });
};

export const useOrg = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: OrgKeys[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return { useFetchOneQuery, invalidateQuery, useFetchAllByUserIdQuery };
};

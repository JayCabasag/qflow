import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateOrgData, Org } from "./schema";
import { createOrg } from "@/app/home/create-org/actions";

export const enum OrgKeys {
  fetchOne = "fetchOneOrg",
  fetchAllUserOrgs = "fetchAllUserOrgs",
}

const useFetchOneQuery = (org: string) => {
  return useQuery({
    queryKey: [OrgKeys.fetchOne],
    queryFn: async () => {
      const { data: organization, error } = await supabase
        .from("org")
        .select("*")
        .eq("code", org)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      return organization;
    },
  });
};

const useFetchManyQuery = () => {
  return useQuery({
    queryKey: [OrgKeys.fetchAllUserOrgs],
    queryFn: async () => {
      const response = await fetch("/api/orgs");

      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const orgs = await response.json();
      return orgs as Org[];
    },
  });
};

const useCreateOrgMutation = () => {
  return useMutation({
    mutationFn: async (createOrgData: CreateOrgData) => {
      const result = await createOrg({
        name: createOrgData.name,
        code: createOrgData.code,
        description: createOrgData.description,
        industry: createOrgData.industry,
        logo: createOrgData.logo,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
  });
};

export const useOrg = () => {
  return { useFetchOneQuery, useCreateOrgMutation, useFetchManyQuery };
};

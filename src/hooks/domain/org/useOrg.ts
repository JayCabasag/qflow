import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateOrgData, Org, UserOrg } from "./schema";
import { createOrg, getUserOrgs } from "@/app/actions/org";

export const enum OrgKeys {
  fetchOne = "fetchOneOrg",
  fetchAllUserOrgs = "fetchAllUserOrgs",
}

const useFetchOrg = (org: string) => {
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

const useFetchAllUserOrgs = (userId: string | undefined) => {
  return useQuery({
    enabled: !!userId,
    queryKey: [OrgKeys.fetchAllUserOrgs],
    queryFn: async () => {
      const orgs = await getUserOrgs();
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
  return { useFetchOrg, useCreateOrgMutation, useFetchAllUserOrgs };
};

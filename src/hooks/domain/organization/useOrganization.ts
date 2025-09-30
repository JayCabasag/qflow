import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const enum OrganizationKeys {
  fetchOne = "fetchOneOrganization",
}

const useFetchOrganization = (org: string) => {
  return useQuery({
    queryKey: [OrganizationKeys.fetchOne],
    queryFn: async () => {
      const { data: organization, error } = await supabase
        .from("organization")
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

export const useOrganization = () => {
  return { useFetchOrganization };
};

import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

export const enum OrgKeys {
  fetchOne = "fetchOneOrg",
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

export const useOrg = () => {
  return { useFetchOrg };
};

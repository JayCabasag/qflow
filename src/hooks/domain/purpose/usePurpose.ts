import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Purpose } from "./schema";

export const enum PurposeKey {
  fetchOne = "fetchOnePurpose",
  fetchManyByOrgQuery = "fetchManyByOrPurpose",
}

const useFetchManyByOrgQuery = (orgCode: string) => {
  return useQuery({
    enabled: orgCode != null,
    queryKey: [PurposeKey.fetchManyByOrgQuery, orgCode],
    queryFn: async () => {
      const response = await fetch(`/api/orgs/${orgCode}/purposes`);

      if (!response.ok) {
        throw new Error("Failed to fetch organization purposes");
      }

      const data = await response.json();
      return data.purposes as Purpose[];
    },
  });
};

export const usePurpose = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: PurposeKey[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return { useFetchManyByOrgQuery, invalidateQuery };
};

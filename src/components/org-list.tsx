"use client";

import { useOrg } from "@/hooks";
import { Building2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrgCard } from "./org-card";

interface Props {
  userId: string;
}

export const OrgList = ({ userId }: Props) => {
  const router = useRouter();
  const { useFetchAllByUserIdQuery } = useOrg();
  const { data, isLoading } = useFetchAllByUserIdQuery(userId);
  const orgs = data ?? [];

  if (isLoading) {
    return (
      <>
        <div className="mb-6">
          <div className="h-10 w-56 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 bg-gray-200 animate-pulse rounded-lg"></div>
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
              <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Create New Organization Button */}
      {orgs.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => router.push("/dashboard/create-org")}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Create New Organization
          </button>
        </div>
      )}

      {/* Organizations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orgs.map((org) => (
          <OrgCard
            key={org.id}
            org={org}
            handleOnViewOrg={() =>
              router.push(`/dashboard/${org.org_code}/${org.org_role}`)
            }
          />
        ))}
      </div>

      {/* Empty State (show when no organizations) */}
      {orgs.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mb-4">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Organizations Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first organization to start managing queues
          </p>
          <button
            onClick={() => router.push("/dashboard/create-org")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Organization
          </button>
        </div>
      )}
    </>
  );
};

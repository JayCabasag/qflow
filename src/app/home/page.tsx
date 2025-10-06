"use client";

import { OrgCard } from "@/components/org-card";
import { Building2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  // Mock data - replace with real data from your API
  const organizations = [
    {
      id: 1,
      code: "hospital",
      name: "City Hospital",
      logo: "🏥",
      role: "Admin",
      stats: {
        todayServed: 145,
        currentWaiting: 23,
        activeCounters: 8,
      },
    },
    {
      id: 2,
      code: "clinic",
      name: "Downtown Clinic",
      logo: "🏢",
      role: "Staff",
      stats: {
        todayServed: 67,
        currentWaiting: 12,
        activeCounters: 4,
      },
    },
    {
      id: 3,
      code: "municipal",
      name: "Municipal Office",
      logo: "🏛️",
      role: "Admin",
      stats: {
        todayServed: 203,
        currentWaiting: 45,
        activeCounters: 12,
      },
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          My Organizations
        </h2>
        <p className="text-gray-600">
          Select an organization to manage queues and view analytics
        </p>
      </div>

      {/* Create New Organization Button */}
      {organizations.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => router.push("/home/create-org")}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Create New Organization
          </button>
        </div>
      )}

      {/* Organizations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <OrgCard
            key={org.id}
            org={org}
            handleOnViewOrg={() => router.push(`/home/${org.code}`)}
          />
        ))}
      </div>

      {/* Empty State (show when no organizations) */}
      {organizations.length === 0 && (
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
            onClick={() => router.push("/home/create-org")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Organization
          </button>
        </div>
      )}
    </main>
  );
}

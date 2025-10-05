"use client";

import { CreateOrgForm } from "@/components/create-org-form";
export default function CreateOrgPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Create New Organization
        </h2>
        <p className="text-sm text-gray-600">
          Set up your organization to start managing queues
        </p>
      </div>

      {/* Form Card */}
      <CreateOrgForm />
    </main>
  );
}

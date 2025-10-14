"use server";

import AdminBoard from "@/components/admin-board";

export default async function AdminPage({
  params,
}: {
  params: { org: string };
}) {
  const resolvedParams = await params;
  const { org } = resolvedParams;

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-4 w-full">
      <AdminBoard org={org} />
    </main>
  );
}

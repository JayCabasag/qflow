"use client";

import { StaffBoard } from "@/components/staff-board";

export default function StaffPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-4 w-full">
      <StaffBoard org="msc" />
    </main>
  );
}

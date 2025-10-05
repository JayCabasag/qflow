"use client";

import { StaffBoard } from "@/components/staff-board";

export default function StaffPage() {
  return (
    <div className="max-w-full mx-auto px-4 py-4">
      <StaffBoard org="msc" />
    </div>
  );
}

"use client";

import PurposeVisitManagement from "./ticket-purpose-manage";
import { StaffList } from "./staff-list";
import { AnnouncementManagement } from "./announcement-management";
import { useOrg } from "@/hooks";
import { TodaysMetrics } from "./todays-metrics";
import { AdminList } from "./admin-list";

import { useState } from "react";
import { AdminBoardHeader } from "./admin-board-header";

interface Props {
  org: string;
}

export default function AdminBoard({ org }: Props) {
  const { useFetchOneQuery } = useOrg();
  const { data, isLoading, isError } = useFetchOneQuery(org);

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  if (isError) {
    return <div>Error..</div>;
  }

  if (!data) {
    return <div>Org not available</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <AdminBoardHeader org={data} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 gap-6 flex flex-col">
          <AdminList org={data} />
          <StaffList org={data} />
        </div>
        <div className="flex flex-col gap-6">
          <TodaysMetrics />
          <PurposeVisitManagement org={data} />
        </div>
        <div className="lg:col-span-1 space-y-4">
          <AnnouncementManagement />
        </div>
      </div>
    </div>
  );
}

"use client";

import PurposeVisitManagement from "./purpose-visit-management";
import { StaffQueues } from "./staff-queues";
import { AnnouncementManagement } from "./announcement-management";
import { useOrg } from "@/hooks";
import { TodaysMetrics } from "./todays-metrics";

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
    <div className="grid lg:grid-cols-4 gap-6">
      <StaffQueues org={data} />
      <div className="flex flex-col gap-6">
        <TodaysMetrics />
        <PurposeVisitManagement org={data} />
      </div>
      <div className="lg:col-span-1 space-y-4">
        <AnnouncementManagement />
      </div>
    </div>
  );
}

"use client";

import {
  Users,
  Timer,
  UserX,
  Monitor,
  Circle,
  TrendingUp,
  X,
  Bell,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import PurposeVisitManagement from "./purpose-visit-management";
import { StaffQueues } from "./staff-queues";
import { AnnouncementManagement } from "./announcement-management";

interface Props {
  org: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "alert";
  timestamp: string;
  dismissible?: boolean;
}

export default function AdminBoard({ org }: Props) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "System Maintenance",
      message: "System will be down for maintenance on Sunday 2-4 AM",
      type: "alert",
      timestamp: "2 hours ago",
      dismissible: true,
    },
    {
      id: "2",
      title: "New Feature Released",
      message: "Check out our new advanced reporting dashboard",
      type: "success",
      timestamp: "1 day ago",
      dismissible: true,
    },
    {
      id: "3",
      title: "Queue Alert",
      message: "Current wait time exceeds average by 15 minutes",
      type: "warning",
      timestamp: "30 min ago",
      dismissible: true,
    },
  ];

  const handleDismiss = (id: string) => {
    setDismissed([...dismissed, id]);
  };

  const getIconAndColor = (type: string) => {
    switch (type) {
      case "alert":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-600",
        };
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-600",
        };
      case "warning":
        return {
          icon: AlertCircle,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-600",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-600",
        };
    }
  };

  const visibleAnnouncements = announcements.filter(
    (a) => !dismissed.includes(a.id)
  );

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <StaffQueues />
      <div className="flex flex-col gap-6">
        {/* Organization Metrics */}
        <div className="bg-white shadow-sm">
          <div className="px-3 py-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 text-xs">
              Today&apos;s Metrics
            </h3>
          </div>

          <div className="grid grid-cols-2">
            <div className="flex flex-col justify-between px-3 py-2">
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Users className="h-3 w-3" />
                Total Customers
              </span>
              <div className="text-sm font-semibold text-gray-900">{100}</div>
            </div>

            {/* Avg Wait */}
            <div className="flex flex-col justify-between px-3 py-2">
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Timer className="h-3 w-3" />
                Avg Wait
              </span>
              <div className="text-sm font-semibold text-green-600">{12}</div>
            </div>

            {/* No-shows */}
            <div className="flex flex-col justify-between px-3 py-2">
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <UserX className="h-3 w-3" />
                No-shows
              </span>
              <div className="text-sm font-semibold text-orange-600">{9}</div>
            </div>

            {/* Satisfaction */}
            <div className="flex flex-col justify-between px-3 py-2">
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Satisfaction
              </span>
              <div className="text-sm font-semibold text-green-600">{98}</div>
            </div>
          </div>
        </div>

        {/* Purpose management */}
        <PurposeVisitManagement org={org} />
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <AnnouncementManagement />
      </div>
    </div>
  );
}

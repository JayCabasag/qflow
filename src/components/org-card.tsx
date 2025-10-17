import { UserOrg } from "@/hooks/domain/org/schema";
import { ChevronRight, Clock, Monitor, Users } from "lucide-react";

interface Props {
  org: UserOrg;
  handleOnViewOrg: () => void;
}

export const OrgCard = ({ org, handleOnViewOrg }: Props) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-50 flex items-center justify-center text-2xl">
              {org.org_logo}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {org.org_name}
              </h3>
              <span
                className={`inline-block px-2 py-0.5 text-xs font-medium mt-1 capitalize ${
                  org.org_role === "admin"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {org.org_role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Stats */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Today Served */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm">Today Served</span>
            </div>
            <span className="font-semibold text-gray-900">
              {/* {org.stats.todayServed} */}
            </span>
          </div>

          {/* Current Waiting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Current Waiting</span>
            </div>
            <span className="font-semibold text-orange-600">
              {/* {org.stats.currentWaiting} */}
            </span>
          </div>

          {/* Active Counters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Monitor className="h-4 w-4" />
              <span className="text-sm">Active Counters</span>
            </div>
            <span className="font-semibold text-green-600">
              {/* {org.stats.activeCounters} */}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0">
        <button
          onClick={handleOnViewOrg}
          className="w-full bg-green-600 text-white py-2.5 px-4 font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2"
        >
          View Organization
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

import { Timer, TrendingUp, Users, UserX } from "lucide-react";

export const TodaysMetrics = () => {
  return (
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
  );
};

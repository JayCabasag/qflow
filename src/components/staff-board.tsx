"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Bell,
  Users,
  TrendingUp,
  Monitor,
  Clock,
  UserCheck,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { QueueItem } from "@/types";
import { useQueues } from "@/hooks";

interface Props {
  org: string;
}

export function StaffBoard({ org }: Props) {
  const { useFetchQueuesStats, useFetchQueuesByStatus } = useQueues();
  const { data: queuesStatsData } = useFetchQueuesStats(org);
  const { data: queuesByOrgData } = useFetchQueuesByStatus(org);

  const stats = queuesStatsData ?? {
    waiting_count: 0,
    completed_count: 0,
    serving_count: 0,
  };

  const queuesByOrg = queuesByOrgData ?? {
    waitingQueues: [],
    servingQueues: [],
    completedQueues: [],
  };

  const callNextInQueue = () => {
    // Call next InQUE
  };

  const notifyCustomer = (ticket: QueueItem) => {
    toast.success(`Notification sent to ${ticket.name}`, {
      description: `Ticket #${ticket.ticket_number}`,
    });
  };

  return (
    <div className="space-y-3">
      {/* Organization Header */}
      <div className="bg-white border border-border shadow-sm p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">
            {org.toUpperCase()}
          </h1>
        </div>
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <div className="text-sm flex">
              <span className="font-semibold">{stats.waiting_count}</span>
              <span className="text-muted-foreground ml-1 hidden md:flex">
                waiting
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Monitor className="h-4 w-4 text-amber-500" />
            <div className="text-sm flex">
              <span className="font-semibold">{stats.serving_count}</span>
              <span className="text-muted-foreground ml-1 hidden md:flex">
                serving
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div className="text-sm flex">
              <span className="font-semibold">{stats.completed_count}</span>
              <span className="text-muted-foreground ml-1 hidden md:flex">
                completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3 h-auto lg:h-[calc(100vh-200px)]">
        {/* Currently Serving - 2/4 of screen */}
        <div className="lg:col-span-2 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="flex flex-row items-center justify-between pb-1 px-3 pt-3 flex-shrink-0">
            <h2 className="text-lg font-bold text-foreground">Now Serving</h2>
            <Button
              onClick={callNextInQueue}
              className="flex items-center gap-2"
              size="sm"
              disabled={stats.waiting_count === 0}
            >
              <Play className="h-3.5 w-3.5" />
              Call Next Customer
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto pt-0 pb-3 px-3">
            {queuesByOrg.servingQueues.length > 0 ? (
              <div className="grid grid-cols-1 gap-2">
                {queuesByOrg.servingQueues.map((ticket) => (
                  <div
                    key={ticket.ticket_number}
                    className="flex items-center justify-between p-2 bg-white border border-border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div
                        className="w-6 h-6 flex items-center justify-center"
                        style={{ backgroundColor: "#16a34a" }}
                      >
                        <span className="text-xs font-bold text-white">S</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="font-medium text-foreground text-sm">
                            {ticket.ticket_number}
                          </div>
                          <div className="text-md text-muted-foreground">
                            • {ticket.name}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1 truncate">
                          {ticket.purpose.name}
                        </div>
                        <div className="text-md text-muted-foreground">
                          {ticket.staff}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => notifyCustomer(ticket)}
                          className="h-6 px-2 text-xs"
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          Notify
                        </Button>
                        <div className="text-md text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Select value={ticket.status}>
                        <SelectTrigger className="w-24 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="waiting">Waiting</SelectItem>
                          <SelectItem value="serving">Serving</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <div className="p-3 bg-green-50 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Monitor className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-medium mb-2">
                  No customers currently being served
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Waiting Queue - 1/4 of screen */}
        <div className="lg:col-span-1 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-2 pt-2 pb-1 flex-shrink-0">
            <h2 className="text-lg font-bold text-foreground">Waiting Queue</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {queuesByOrg.waitingQueues.length > 0 ? (
              <div className="space-y-1">
                {queuesByOrg.waitingQueues.map((ticket) => (
                  <div
                    key={ticket.ticket_number}
                    className="flex items-center justify-between p-1.5 bg-white border border-border/50 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ backgroundColor: "#16a34a" }}
                      >
                        <span className="text-md font-bold text-white">
                          #{ticket.ticket_number}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-md">
                          {ticket.name}
                        </div>
                        <div className="text-md text-muted-foreground truncate max-w-32">
                          {ticket.purpose.name}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => notifyCustomer(ticket)}
                      className="h-6 px-2 text-xs"
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      Notify
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="p-2 bg-green-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  No one waiting
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Completed Tickets - 1/4 of screen */}
        <div className="lg:col-span-1 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="px-2 pt-2 pb-1 flex-shrink-0">
            <h2 className="text-lg font-bold text-foreground">Completed</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {queuesByOrg.completedQueues.length > 0 ? (
              <div className="space-y-1">
                {queuesByOrg.completedQueues.map((ticket) => (
                  <div
                    key={ticket.ticket_number}
                    className="flex items-center justify-between p-1.5 bg-gray-50 border border-border/30 opacity-75"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ backgroundColor: "#6b7280" }}
                      >
                        <span className="text-md font-bold text-white">✓</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-md">
                          {ticket.ticket_number} - {ticket.name}
                        </div>
                        <div className="text-md text-muted-foreground truncate max-w-32">
                          {ticket.purpose.name}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="p-2 bg-green-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  No completed tickets
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

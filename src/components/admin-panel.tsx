"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Play, CheckCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface QueueItem {
  name: string;
  phone: string;
  purpose: string;
  staff: string;
  ticketNumber: string;
  timestamp: Date;
  status: "waiting" | "serving" | "completed";
}

export function AdminPanel() {
  const [queueData, setQueueData] = useState<QueueItem[]>([]);

  useEffect(() => {
    loadQueueData();
  }, []);

  const loadQueueData = () => {
    const data = JSON.parse(localStorage.getItem("queueData") || "[]");
    setQueueData(data);
  };

  const updateTicketStatus = (
    ticketNumber: string,
    newStatus: "waiting" | "serving" | "completed"
  ) => {
    const updatedData = queueData.map((item) =>
      item.ticketNumber === ticketNumber ? { ...item, status: newStatus } : item
    );

    localStorage.setItem("queueData", JSON.stringify(updatedData));
    setQueueData(updatedData);

    toast("Status Updated", {
      description: `Ticket ${ticketNumber} is now ${newStatus}`,
    });
  };

  const callNextInQueue = () => {
    const waitingTickets = queueData.filter(
      (item) => item.status === "waiting"
    );
    if (waitingTickets.length > 0) {
      const nextTicket = waitingTickets[0];
      updateTicketStatus(nextTicket.ticketNumber, "serving");
      toast("Next Customer Called", {
        description: `Now serving ${nextTicket.ticketNumber}`,
      });
      toast.success("This is a success toast");
    } else {
      toast("No Waiting Customers", {
        description: "The queue is currently empty",
      });
    }
  };

  const clearCompletedTickets = () => {
    const activeData = queueData.filter((item) => item.status !== "completed");
    localStorage.setItem("queueData", JSON.stringify(activeData));
    setQueueData(activeData);

    toast("Completed Tickets Cleared", {
      description: "All completed tickets have been removed",
    });
  };

  const resetQueue = () => {
    localStorage.removeItem("queueData");
    setQueueData([]);

    toast("Queue Reset", {
      description: "All tickets have been cleared",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-secondary text-secondary-foreground";
      case "serving":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const waitingCount = queueData.filter(
    (item) => item.status === "waiting"
  ).length;
  const servingCount = queueData.filter(
    (item) => item.status === "serving"
  ).length;
  const completedCount = queueData.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Queue Management
          </CardTitle>
          <CardDescription>
            Manage the queue status and call customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={callNextInQueue}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Call Next Customer
            </Button>
            <Button
              onClick={clearCompletedTickets}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <CheckCircle className="h-4 w-4" />
              Clear Completed
            </Button>
            <Button
              onClick={resetQueue}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Queue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-secondary">
              {waitingCount}
            </div>
            <div className="text-sm text-muted-foreground">Waiting</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary">
              {servingCount}
            </div>
            <div className="text-sm text-muted-foreground">Being Served</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-muted-foreground">
              {completedCount}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* All Tickets Management */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            View and manage all tickets in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {queueData.length > 0 ? (
            <div className="space-y-3">
              {queueData.map((ticket) => (
                <div
                  key={ticket.ticketNumber}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-mono font-bold">
                      {ticket.ticketNumber}
                    </div>
                    <div>
                      <div className="font-medium">{ticket.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {ticket.purpose} • {ticket.staff}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>

                    <Select
                      value={ticket.status}
                      onValueChange={(
                        value: "waiting" | "serving" | "completed"
                      ) => updateTicketStatus(ticket.ticketNumber, value)}
                    >
                      <SelectTrigger className="w-32">
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
            <div className="text-center py-8 text-muted-foreground">
              No tickets in the system
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

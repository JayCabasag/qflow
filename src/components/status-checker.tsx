"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, MapPin, User } from "lucide-react";
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

export function StatusChecker() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketStatus, setTicketStatus] = useState<QueueItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!ticketNumber.trim()) {
      toast.error("Error", {
        description: "Please enter a ticket number",
      });
      return;
    }

    setIsSearching(true);
    setNotFound(false);
    setTicketStatus(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const queueData = JSON.parse(localStorage.getItem("queueData") || "[]");
    const ticket = queueData.find(
      (item: QueueItem) => item.ticketNumber === ticketNumber.toUpperCase()
    );

    if (ticket) {
      // Calculate current position for waiting tickets
      if (ticket.status === "waiting") {
        const waitingTickets = queueData.filter(
          (item: QueueItem) => item.status === "waiting"
        );
        const currentPosition =
          waitingTickets.findIndex(
            (item: QueueItem) => item.ticketNumber === ticket.ticketNumber
          ) + 1;
        ticket.position = currentPosition;
      }
      setTicketStatus(ticket);
    } else {
      setNotFound(true);
    }

    setIsSearching(false);
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting":
        return "Waiting in Queue";
      case "serving":
        return "Currently Being Served";
      case "completed":
        return "Service Completed";
      default:
        return "Unknown Status";
    }
  };

  const getEstimatedWaitTime = (position: number) => {
    return position * 5; // 5 minutes per person estimate
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-card border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Check Queue Status</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your ticket number to check your current position in the queue
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ticket">Ticket Number</Label>
              <div className="flex gap-2">
                <Input
                  id="ticket"
                  value={ticketNumber}
                  onChange={(e) =>
                    setTicketNumber(e.target.value.toUpperCase())
                  }
                  placeholder="Enter ticket number (e.g., Q123456)"
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSearching ? "Searching..." : "Check Status"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ticketStatus && (
        <div className="bg-card border-2 border-primary/20">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-primary">Ticket Found</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {ticketStatus.ticketNumber}
              </div>
              <Badge className={getStatusColor(ticketStatus.status)}>
                {getStatusText(ticketStatus.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="font-medium">{ticketStatus.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Purpose:
                  </span>
                  <span className="font-medium">{ticketStatus.purpose}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Staff:</span>
                  <span className="font-medium">{ticketStatus.staff}</span>
                </div>
              </div>

              <div className="space-y-3">
                {ticketStatus.status === "waiting" && (
                  <>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Position:
                      </span>
                      <span className="font-bold text-secondary">
                        #{ticketStatus.ticketNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Est. Wait:
                      </span>
                      <span className="font-medium">
                        {/* {getEstimatedWaitTime(ticketStatus.position)} minutes */}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Registered:
                  </span>
                  <span className="font-medium">
                    {new Date(ticketStatus.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {ticketStatus.status === "waiting" && (
              <div className="bg-secondary/30 p-4 border-l-4 border-primary">
                <p className="text-sm">
                  <strong>Please wait for your number to be called.</strong> You
                  {/* are currently #{ticketStatus.position} in the queue. Estimated */}
                  wait time is approximately{" "}
                  {/* {getEstimatedWaitTime(ticketStatus.position)} minutes. */}
                </p>
              </div>
            )}

            {ticketStatus.status === "serving" && (
              <div className="bg-primary/10 p-4 border-l-4 border-primary">
                <p className="text-sm">
                  <strong>You are currently being served!</strong> Please
                  proceed to the designated counter.
                </p>
              </div>
            )}

            {ticketStatus.status === "completed" && (
              <div className="bg-muted p-4 rounded-lg border-l-4 border-muted-foreground">
                <p className="text-sm">
                  <strong>Your service has been completed.</strong> Thank you
                  for visiting us today!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {notFound && (
        <div className="bg-card border-2 border-destructive/20">
          <div className="p-6 text-center">
            <div className="text-destructive mb-2">
              <Search className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-lg font-semibold">Ticket Not Found</h3>
            </div>
            <p className="text-muted-foreground">
              The ticket number "{ticketNumber}" was not found in our system.
              Please check the number and try again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

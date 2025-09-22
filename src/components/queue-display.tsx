"use client";

import { Monitor, Users, TrendingUp, Smartphone } from "lucide-react";
import { AnnouncementMarquee } from "./announcement-marquee";
import { Button } from "./ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Purpose {
  purpose: string;
}
interface QueueItem {
  id: number;
  name: string;
  phone: string;
  purpose: Purpose;
  staff: string;
  ticket_number: number;
  status: "waiting" | "serving" | "completed";
  created_at: Date;
}

interface Stats {
  serving_count: number;
  waiting_count: number;
  completed_count: number;
}

interface Props {
  queues: QueueItem[];
  stats: Stats;
  org: string;
}

export function QueueDisplay({ queues, org, stats }: Props) {
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const currenltyWaiting = queues.filter((item) => item.status === "waiting");
  const currentlyServing = queues.filter((item) => item.status === "serving");

  return (
    <div className="space-y-3">
      <AnnouncementMarquee />
      <div className="flex items-center justify-between text-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3 text-primary" />
            <span className="font-medium">{stats.waiting_count} in queue</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="font-medium">
              {stats.completed_count} completed today
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Monitor className="h-3 w-3 text-primary" />
          <span className="font-medium">{stats.serving_count} now serving</span>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-4 gap-3 h-auto md:h-[calc(100vh-160px)]">
        {/* Currently Serving - 3/4 of screen on desktop, full width on mobile */}
        <div className="md:col-span-3 bg-white border border-border shadow-sm overflow-hidden flex flex-col h-100 md:h-auto">
          <div className="flex flex-row items-center justify-between pb-1 px-3 pt-3 flex-shrink-0">
            <h2 className="text-lg font-bold text-foreground">Now Serving</h2>
          </div>
          <div className="flex-1 overflow-y-auto pt-0 pb-3 px-3">
            {currentlyServing.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {currentlyServing.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-2 bg-white border border-border hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div
                        className="w-6 h-6 flex items-center justify-center"
                        style={{ backgroundColor: "#16a34a" }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#ffffff" }}
                        >
                          S
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="font-medium text-foreground text-sm">
                            {customer.ticket_number}
                          </div>
                          <div className="text-md text-muted-foreground">
                            • {customer.name}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1 truncate">
                          {customer.purpose.purpose}
                        </div>
                        <div className="text-md text-muted-foreground">
                          {customer.staff}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="text-md text-muted-foreground">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-200 text-xs px-2 py-1 h-6"
                      >
                        Processing
                      </Button>
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

        {/* Waiting Queue - 1/4 of screen on desktop, full width below on mobile */}
        <div className="md:col-span-1 bg-white border border-border shadow-sm overflow-hidden flex flex-col h-150 md:h-auto">
          <div className="px-2 pt-2 pb-1 flex-shrink-0">
            <h2 className="text-lg font-bold text-foreground">Waiting Queue</h2>
          </div>

          <div className="px-2 pb-2 flex-shrink-0">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-border p-2">
              <div className="text-center">
                <div className="w-36 h-36 bg-white shadow-sm flex items-center justify-center mb-1 mx-auto">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      `${baseUrl}/${org}/join`
                    )}`}
                    alt="QR Code to join queue"
                    className="w-36 h-36"
                  />
                </div>
                <div className="text-md font-semibold text-foreground mb-1">
                  Scan to join
                </div>
                {/* <div className="flex items-center justify-center space-x-1 text-md text-muted-foreground">
                  <Smartphone className="h-4 w-4" />
                  <span>Scan Me!</span>
                </div> */}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {currenltyWaiting.length > 0 ? (
              <div className="space-y-1">
                {currenltyWaiting.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-1.5 bg-white border border-border/50 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ backgroundColor: "#16a34a" }}
                      >
                        <span
                          className="text-md font-bold"
                          style={{ color: "#ffffff" }}
                        >
                          #{item.ticket_number}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-md">
                          {item.ticket_number} - {item.name}
                        </div>
                        <div className="text-md text-muted-foreground truncate max-w-45">
                          {item.purpose.purpose}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="p-2 bg-green-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  No one waiting
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

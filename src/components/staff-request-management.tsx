import { Check, UserPlus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface StaffRequest {
  id: string;
  name: string;
  email: string;
  requestedRole: string;
  requestDate: Date;
  status: "pending" | "approved" | "rejected";
}

export default function StaffRequestManagement() {
  const [staffRequests, setStaffRequests] = useState<StaffRequest[]>([
    {
      id: "1",
      name: "Alice Brown",
      email: "alice@email.com",
      requestedRole: "Counter Staff",
      requestDate: new Date(),
      status: "pending",
    },
    {
      id: "2",
      name: "Bob Wilson",
      email: "bob@email.com",
      requestedRole: "Supervisor",
      requestDate: new Date(),
      status: "pending",
    },
  ]);

  const pendingRequests = staffRequests.filter(
    (req) => req.status === "pending"
  );

  const handleStaffRequest = (id: string, action: "approved" | "rejected") => {
    setStaffRequests(
      staffRequests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
    toast(`Request ${action}`, {
      description: `Staff request has been ${action}`,
    });
  };

  return (
    <div className="xl:col-span-1 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="px-2 pt-2 pb-1 flex-shrink-0">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Staff Requests
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {pendingRequests.length > 0 ? (
          <div className="space-y-1">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="p-2 bg-white border border-border/50 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-foreground text-sm">
                      {request.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {request.email}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {request.requestedRole}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => handleStaffRequest(request.id, "approved")}
                    size="sm"
                    className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={() => handleStaffRequest(request.id, "rejected")}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="p-2 bg-green-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              No pending requests
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

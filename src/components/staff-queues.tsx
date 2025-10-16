import { Plus, Trash2, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Staff {
  id: string;
  name: string;
  counter: string;
  status: "active" | "inactive" | "break";
  currentCustomer?: string;
}

export function StaffQueues() {
  const [staffList, setStaffList] = useState<Staff[]>([
    {
      id: "1",
      name: "John Doe",
      counter: "Counter 1",
      status: "active",
      currentCustomer: "A001",
    },
    { id: "2", name: "Jane Smith", counter: "Counter 2", status: "active" },
    { id: "3", name: "Mike Johnson", counter: "Counter 3", status: "break" },
  ]);

  const staffActivity = [
    {
      id: 1,
      name: "Maria Santos",
      status: "online",
      counter: "Counter 1",
      currentTicket: "A-042",
      servedToday: 12,
    },
    {
      id: 2,
      name: "Pedro Cruz",
      status: "online",
      counter: "Counter 3",
      currentTicket: "B-015",
      servedToday: 8,
    },
    {
      id: 3,
      name: "Ana Reyes",
      status: "online",
      counter: "Counter 5",
      currentTicket: null,
      servedToday: 15,
    },
    {
      id: 4,
      name: "Jose Gomez",
      status: "offline",
      counter: null,
      currentTicket: null,
      servedToday: 0,
    },
  ];

  const updateStaffStatus = (
    id: string,
    status: "active" | "inactive" | "break"
  ) => {
    setStaffList(
      staffList.map((staff) => (staff.id === id ? { ...staff, status } : staff))
    );
    toast("Staff Status Updated", {
      description: "Staff member status has been updated",
    });
  };

  const removeStaff = (id: string) => {
    setStaffList(staffList.filter((staff) => staff.id !== id));
    toast("Staff Removed", {
      description: "Staff member has been removed",
    });
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "break":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="xl:col-span-2 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="flex flex-row items-center justify-between pb-1 px-3 pt-3 flex-shrink-0">
        <h2 className="text-lg font-bold text-foreground">Staff & Queues</h2>
        <Button>
          <Plus />
          Add staff
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto pt-2 pb-3 px-3">
        {staffList.length > 0 ? (
          <div className="space-y-2">
            {staffList.map((staff) => (
              <div
                key={staff.id}
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
                      {staff.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="font-medium text-foreground text-sm">
                        {staff.name}
                      </div>
                      <Badge className={getStaffStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {staff.counter}
                      {staff.currentCustomer && (
                        <span className="ml-2 text-green-600">
                          • Serving {staff.currentCustomer}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Select
                    value={staff.status}
                    onValueChange={(value: "active" | "inactive" | "break") =>
                      updateStaffStatus(staff.id, value)
                    }
                  >
                    <SelectTrigger className="w-20 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => removeStaff(staff.id)}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <div className="p-3 bg-blue-50 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium mb-2">
              No staff members added yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

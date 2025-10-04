"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Settings,
  User,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  SkipForward,
  Users,
  Timer,
  UserX,
  Monitor,
  Circle,
  ChevronRight,
  TrendingUp,
  Activity,
  ListChecks,
  Trash2,
  UserPlus,
  Plus,
  Badge,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Staff {
  id: string;
  name: string;
  counter: string;
  status: "active" | "inactive" | "break";
  currentCustomer?: string;
}

interface PurposeOfVisit {
  id: string;
  name: string;
  description: string;
  estimatedTime: number; // in minutes
  isActive: boolean;
}

interface StaffRequest {
  id: string;
  name: string;
  email: string;
  requestedRole: string;
  requestDate: Date;
  status: "pending" | "approved" | "rejected";
}

interface QueueStats {
  waiting_count: number;
  serving_count: number;
  completed_count: number;
  total_today: number;
  average_wait_time: number;
}

export default function OrganizationDashboard() {
  const [orgName, setOrgName] = useState("Organization Name");
  const [isEditingOrgName, setIsEditingOrgName] = useState(false);
  const [tempOrgName, setTempOrgName] = useState(orgName);

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

  const [purposeList, setPurposeList] = useState<PurposeOfVisit[]>([
    {
      id: "1",
      name: "General Inquiry",
      description: "General questions and information",
      estimatedTime: 10,
      isActive: true,
    },
    {
      id: "2",
      name: "Document Processing",
      description: "Process official documents",
      estimatedTime: 20,
      isActive: true,
    },
    {
      id: "3",
      name: "Consultation",
      description: "Expert consultation service",
      estimatedTime: 30,
      isActive: true,
    },
    {
      id: "4",
      name: "Payment Services",
      description: "Payment and billing services",
      estimatedTime: 15,
      isActive: false,
    },
  ]);

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

  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffCounter, setNewStaffCounter] = useState("");
  const [newPurposeName, setNewPurposeName] = useState("");
  const [newPurposeDesc, setNewPurposeDesc] = useState("");
  const [newPurposeTime, setNewPurposeTime] = useState("");

  // Mock queue stats - in real app this would come from your queue data
  const queueStats: QueueStats = {
    waiting_count: 12,
    serving_count: 3,
    completed_count: 45,
    total_today: 60,
    average_wait_time: 15,
  };

  const handleOrgNameSave = () => {
    setOrgName(tempOrgName);
    setIsEditingOrgName(false);
    toast("Organization Updated", {
      description: `Organization name changed to "${tempOrgName}"`,
    });
  };

  const addStaff = () => {
    if (newStaffName.trim() && newStaffCounter.trim()) {
      const newStaff: Staff = {
        id: Date.now().toString(),
        name: newStaffName.trim(),
        counter: newStaffCounter.trim(),
        status: "inactive",
      };
      setStaffList([...staffList, newStaff]);
      setNewStaffName("");
      setNewStaffCounter("");
      toast("Staff Added", {
        description: `${newStaff.name} has been added to ${newStaff.counter}`,
      });
    }
  };

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

  const addPurpose = () => {
    if (newPurposeName.trim() && newPurposeDesc.trim() && newPurposeTime) {
      const newPurpose: PurposeOfVisit = {
        id: Date.now().toString(),
        name: newPurposeName.trim(),
        description: newPurposeDesc.trim(),
        estimatedTime: parseInt(newPurposeTime),
        isActive: true,
      };
      setPurposeList([...purposeList, newPurpose]);
      setNewPurposeName("");
      setNewPurposeDesc("");
      setNewPurposeTime("");
      toast("Purpose Added", {
        description: `"${newPurpose.name}" has been added to purposes`,
      });
    }
  };

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

  const pendingRequests = staffRequests.filter(
    (req) => req.status === "pending"
  );

  return (
    <>
      {/* Main Content */}
      <div className="max-w-full mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Section (Queue + Current Serving) */}
          {/* Staff Management */}
          <div className="xl:col-span-2 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-row items-center justify-between pb-1 px-3 pt-3 flex-shrink-0">
              <h2 className="text-lg font-bold text-foreground">
                Staff & Counters
              </h2>
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
                            <Badge
                              className={getStaffStatusColor(staff.status)}
                            >
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
                          onValueChange={(
                            value: "active" | "inactive" | "break"
                          ) => updateStaffStatus(staff.id, value)}
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

          <div className="flex flex-col gap-6">
            {/* Staff Requests */}
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
                            onClick={() =>
                              handleStaffRequest(request.id, "approved")
                            }
                            size="sm"
                            className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            onClick={() =>
                              handleStaffRequest(request.id, "rejected")
                            }
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

            {/* Purpose of Visit Management */}
            <div className="xl:col-span-1 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="px-2 pt-2 pb-1 flex-shrink-0">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-1">
                  <ListChecks className="h-4 w-4" />
                  Purposes
                </h2>
              </div>

              {/* Add New Purpose */}
              <div className="px-2 pb-2 border-b border-border/50">
                <div className="space-y-1">
                  <Input
                    placeholder="Purpose name"
                    value={newPurposeName}
                    onChange={(e) => setNewPurposeName(e.target.value)}
                    className="h-6 text-xs"
                  />
                  <Input
                    placeholder="Description"
                    value={newPurposeDesc}
                    onChange={(e) => setNewPurposeDesc(e.target.value)}
                    className="h-6 text-xs"
                  />
                  <div className="flex gap-1">
                    <Input
                      placeholder="Time (min)"
                      type="number"
                      value={newPurposeTime}
                      onChange={(e) => setNewPurposeTime(e.target.value)}
                      className="h-6 text-xs flex-1"
                    />
                    <Button
                      onClick={addPurpose}
                      size="sm"
                      className="h-6 px-2"
                      disabled={
                        !newPurposeName.trim() ||
                        !newPurposeDesc.trim() ||
                        !newPurposeTime
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 pb-2">
                {purposeList.length > 0 ? (
                  <div className="space-y-1">
                    {purposeList.map((purpose) => (
                      <div
                        key={purpose.id}
                        className={`p-2 border border-border/50 hover:shadow-sm transition-shadow ${
                          purpose.isActive
                            ? "bg-white"
                            : "bg-gray-50 opacity-75"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <div className="font-medium text-foreground text-xs">
                              {purpose.name}
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">
                              {purpose.description}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ~{purpose.estimatedTime} min
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            // onClick={() => togglePurposeStatus(purpose.id)}
                            variant="outline"
                            size="sm"
                            className={`h-6 px-2 text-xs ${
                              purpose.isActive
                                ? "text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                                : "text-green-600 border-green-200 hover:bg-green-50"
                            }`}
                          >
                            {purpose.isActive ? "Disable" : "Enable"}
                          </Button>
                          <Button
                            // onClick={() => removePurpose(purpose.id)}
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="p-2 bg-blue-50 w-10 h-10 mx-auto mb-2 flex items-center justify-center">
                      <ListChecks className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      No purposes added yet
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Organization Metrics */}
            <div className="bg-white shadow-sm">
              <div className="px-3 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 text-xs">
                  Today's Metrics
                </h3>
              </div>

              <div className="grid grid-cols-2">
                {/* Total Customers */}
                <div className="flex flex-col justify-between px-3 py-2">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Total Customers
                  </span>
                  <div className="text-sm font-semibold text-gray-900">
                    {100}
                  </div>
                </div>

                {/* Avg Wait */}
                <div className="flex flex-col justify-between px-3 py-2">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    Avg Wait
                  </span>
                  <div className="text-sm font-semibold text-green-600">
                    {12}
                  </div>
                </div>

                {/* No-shows */}
                <div className="flex flex-col justify-between px-3 py-2">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <UserX className="h-3 w-3" />
                    No-shows
                  </span>
                  <div className="text-sm font-semibold text-orange-600">
                    {9}
                  </div>
                </div>

                {/* Satisfaction */}
                <div className="flex flex-col justify-between px-3 py-2">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Satisfaction
                  </span>
                  <div className="text-sm font-semibold text-green-600">
                    {98}
                  </div>
                </div>
              </div>
            </div>

            {/* Staff Activity */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 text-sm">
                  Staff Activity
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {staffActivity.map((staff) => (
                  <div key={staff.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm mb-1">
                          {staff.name}
                        </div>
                        {staff.counter && (
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <Monitor className="h-3 w-3" />
                            {staff.counter}
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-1 text-xs font-medium ${
                          staff.status === "online"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        <Circle
                          className={`h-2 w-2 fill-current ${
                            staff.status === "online" ? "animate-pulse" : ""
                          }`}
                        />
                        {staff.status}
                      </div>
                    </div>

                    {staff.currentTicket && (
                      <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 mb-2 inline-block font-medium">
                        Serving: {staff.currentTicket}
                      </div>
                    )}

                    <div className="text-xs text-gray-600">
                      Served today:{" "}
                      <span className="font-medium text-gray-900">
                        {staff.servedToday}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

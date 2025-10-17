import { Plus, Trash2, Users, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ActionState } from "@/lib/auth/middleware";
import { addStaff, removeStaff } from "@/app/dashboard/[org]/admin/actions";
import { StaffKey, useStaff } from "@/hooks";
import { Staff } from "@/hooks/domain/staff/schema";
import { UserOrg } from "@/hooks/domain/org/schema";

interface Props {
  org: UserOrg;
}

export function StaffQueues({ org }: Props) {
  const { useFetchAllByOrgCodeQuery, invalidateQuery } = useStaff();
  const { data: staffs, isLoading } = useFetchAllByOrgCodeQuery(org.org_code);
  const staffList = staffs ?? [];

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [staffToRemove, setStaffToRemove] = useState<Staff | null>(null);
  const roleOptions = ["admin", "staff"];

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addStaff,
    { error: "" }
  );

  const [removeState, removeFormAction, isRemoving] = useActionState<
    ActionState,
    FormData
  >(removeStaff, { error: "" });

  useEffect(() => {
    if (!isPending && state.success == "success") {
      invalidateQuery([StaffKey.fetchAllByOrgCodeQuery]);
      setAddDialogOpen(false);
      toast.success("Staff added successfully");
      state.success = "";
    }
  }, [isPending, state, invalidateQuery]);

  console.log(removeState.error);

  useEffect(() => {
    if (!isRemoving && removeState.success == "success") {
      invalidateQuery([StaffKey.fetchAllByOrgCodeQuery]);
      setRemoveDialogOpen(false);
      setStaffToRemove(null);
      toast.success("Staff removed successfully");
      removeState.success = "";
    }
  }, [isRemoving, removeState, invalidateQuery]);

  const handleRemoveClick = (staff: Staff) => {
    setStaffToRemove(staff);
    setRemoveDialogOpen(true);
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
    <>
      {/* Add Staff Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Staff</DialogTitle>
            <DialogDescription>
              Add a new staff member to the queue system.
            </DialogDescription>
          </DialogHeader>

          <form action={formAction}>
            <div className="space-y-4">
              <Input
                hidden
                type="number"
                name="orgId"
                defaultValue={org.id as number}
              />
              <div>
                <label className="text-sm font-medium mb-2 block">
                  User ID
                </label>
                <Input
                  placeholder="Enter staff id"
                  name="userId"
                  className="h-9"
                  defaultValue={state.userId as string}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Staff User Name
                </label>
                <Input
                  placeholder="Enter staff name"
                  name="name"
                  className="h-9"
                  defaultValue={state.name as string}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Counter Assignment
                </label>
                <Input
                  placeholder="e.g., Counter 4"
                  name="assign"
                  className="h-9"
                  defaultValue={state.assign as string}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select
                  name="role"
                  defaultValue={state.role as string}
                  required
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {state.error && (
              <div className="p-3 mt-4 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-600">{state.error}</p>
              </div>
            )}
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddDialogOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Staff"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Remove Staff Alert Dialog */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong>{staffToRemove?.name}</strong> from the staff list? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {removeState.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-600">{removeState.error}</p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
            <form action={removeFormAction}>
              <Input
                hidden
                name="id"
                value={staffToRemove?.id || ""}
                readOnly
              />
              <AlertDialogAction
                type="submit"
                disabled={isRemoving}
                className="bg-red-600 hover:bg-red-700"
              >
                {isRemoving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  "Remove"
                )}
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="md:col-span-2 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-row items-center justify-between pb-1 px-3 pt-3 flex-shrink-0">
          <h2 className="text-lg font-bold text-foreground">Staff & Queues</h2>
          <Button onClick={() => setAddDialogOpen(true)} disabled={isLoading}>
            <Plus />
            Add staff
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto pt-2 pb-3 px-3">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-2 border border-border/50 bg-gray-50 animate-pulse rounded"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gray-200 rounded" />
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-2 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-1">
                    <div className="h-6 bg-gray-200 rounded w-20" />
                    <div className="h-6 bg-gray-200 rounded w-8" />
                  </div>
                </div>
              ))}
            </div>
          ) : staffList.length > 0 ? (
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
                        {staff.assign}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Select value={staff.status}>
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
                      onClick={() => handleRemoveClick(staff)}
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
    </>
  );
}

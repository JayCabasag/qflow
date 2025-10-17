import { ListChecks, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState, useEffect, useTransition, useState } from "react";
import { addPurpose, removePurpose } from "@/app/dashboard/[org]/admin/actions";
import { ActionState } from "@/lib/auth/middleware";
import { PurposeKey, usePurpose } from "@/hooks";
import { Purpose } from "@/hooks/domain/purpose/schema";
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
import { toast } from "sonner";
import { UserOrg } from "@/hooks/domain/org/schema";

interface Props {
  org: UserOrg;
}

export default function PurposeVisitManagement({ org }: Props) {
  const [, startTransition] = useTransition();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [selectedPurpose, setSelectedPurpose] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const { useFetchManyByOrgQuery, invalidateQuery } = usePurpose();
  const { data } = useFetchManyByOrgQuery(org.org_code);
  const purposeList: Purpose[] = data ?? [];

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addPurpose,
    { error: "" }
  );

  const [removeState, removeFormAction, isRemoving] = useActionState<
    ActionState,
    FormData
  >(removePurpose, { error: "" });

  useEffect(() => {
    if (!isPending && state.success == "success") {
      invalidateQuery([PurposeKey.fetchManyByOrgQuery]);
      setAddDialogOpen(false);
      toast.success("Purpose added successfully");
      state.success = "";
    }
  }, [isPending, state, invalidateQuery]);

  useEffect(() => {
    if (!isRemoving && removeState.success == "success") {
      invalidateQuery([PurposeKey.fetchManyByOrgQuery]);
      setDeleteDialogOpen(false);
      setSelectedPurpose(null);
      toast.success("Purpose removed successfully");
      removeState.success = "";
    }
  }, [isRemoving, removeState, invalidateQuery]);

  const handleRemoveClick = (purposeId: number, purposeName: string) => {
    setSelectedPurpose({ id: purposeId, name: purposeName });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPurpose) {
      startTransition(() => {
        const formData = new FormData();
        formData.append("id", selectedPurpose.id.toString());
        removeFormAction(formData);
      });
    }
  };

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {`Delete "${selectedPurpose?.name}"?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              purpose and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isRemoving}
            >
              {isRemoving ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Purpose Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Purpose</DialogTitle>
            <DialogDescription>
              Create a new purpose of visit for your organization.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction}>
            <div className="space-y-4">
              <Input type="hidden" name="orgCode" defaultValue={org.org_code} />
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Purpose Name
                </label>
                <Input
                  placeholder="Enter purpose name"
                  name="name"
                  defaultValue={state.name as string}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Description
                </label>
                <Input
                  placeholder="Enter description"
                  name="description"
                  defaultValue={state.description as string}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Estimated Time (minutes)
                </label>
                <Input
                  placeholder="Enter time in minutes"
                  type="number"
                  name="estimatedTimeInMinutes"
                  defaultValue={state.estimated_time_in_minutes as string}
                />
              </div>
              {state.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm text-red-600">{state.error}</p>
                </div>
              )}
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add Purpose"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Purpose of Visit Management */}
      <div className="xl:col-span-1 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="px-2 pt-2 pb-2 flex-shrink-0 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-1">
            <ListChecks className="h-4 w-4" />
            Purposes
          </h2>
          <Button
            size="sm"
            className="h-8 px-3"
            onClick={() => setAddDialogOpen(true)}
          >
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {!data ? (
            <div className="space-y-1">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="p-2 border border-border/50 bg-gray-50 animate-pulse rounded"
                >
                  <div className="mb-2">
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
                    <div className="h-2 bg-gray-200 rounded w-full mb-1" />
                    <div className="h-2 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="flex gap-1">
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-6 bg-gray-200 rounded w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : purposeList.length > 0 ? (
            <div className="space-y-1">
              {purposeList.map((purpose) => (
                <div
                  key={purpose.id}
                  className={`p-2 border border-border/50 hover:shadow-sm transition-shadow ${
                    purpose.is_active ? "bg-white" : "bg-gray-50 opacity-75"
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
                        ~{purpose.estimated_time_in_minutes} min
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-6 px-2 text-xs ${
                        purpose.is_active
                          ? "text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                          : "text-green-600 border-green-200 hover:bg-green-50"
                      }`}
                    >
                      {purpose.is_active ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      onClick={() =>
                        handleRemoveClick(purpose.id, purpose.name)
                      }
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
    </>
  );
}

import {
  Settings,
  RotateCcw,
  Power,
  Bell,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { Org } from "@/hooks/domain/org/schema";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ActionState } from "@/lib/auth/middleware";
import { removeOrg } from "@/app/dashboard/[org]/admin/actions";
import { OrgKeys, useOrg } from "@/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  org: Org;
}

export function AdminBoardHeader({ org }: Props) {
  const router = useRouter();
  const { invalidateQuery } = useOrg();
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [openDeleteOrgDialog, setOpenDeleteOrgDialog] = useState(false);

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    removeOrg,
    { error: "" }
  );

  useEffect(() => {
    if (!isPending && state.success == "success") {
      invalidateQuery([OrgKeys.fetchAllByUserIdQuery]);
      toast.success("Organization removed successfully");
      state.success = "";
      router.replace("/dashboard");
    }
  }, [isPending, router, state, invalidateQuery]);

  return (
    <div className="bg-white border border-border shadow-sm p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-green-600" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Administrator</h1>
            <p className="text-sm text-muted-foreground">{org.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 border border-border rounded">
            <Power
              className={`h-4 w-4 ${
                isSystemActive ? "text-green-600" : "text-gray-400"
              }`}
            />
            <span className="text-sm font-medium">System</span>
            <Switch
              checked={isSystemActive}
              onCheckedChange={setIsSystemActive}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Reset Queue
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Change Ownership</DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setOpenDeleteOrgDialog(true)}
              >
                Delete Organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={openDeleteOrgDialog} onOpenChange={setOpenDeleteOrgDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form action={formAction}>
            <DialogHeader>
              <DialogTitle>Delete organization</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                <span className="font-semibold text-foreground">
                  {org.name}
                </span>{" "}
                and all associated data including tickets, staff, and settings.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Hidden field for org ID */}
              <input type="hidden" name="id" value={org.id} />

              <div className="grid gap-3">
                <Label htmlFor="name">
                  Type <span className="font-semibold">{org.name}</span> to
                  confirm
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={state.name as string}
                  placeholder={`Type "${org.name}" to confirm...`}
                  disabled={isPending}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Confirm your password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password..."
                  disabled={isPending}
                  autoComplete="current-password"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter your account password to confirm this action
                </p>
              </div>

              {state.error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                  {state.error}
                </div>
              )}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Organization"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

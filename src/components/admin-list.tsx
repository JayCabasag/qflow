import { useStaff } from "@/hooks";
import { Org } from "@/hooks/domain/org/schema";
import { Users } from "lucide-react";
import { Badge } from "./ui/badge";

interface Props {
  org: Org;
}
export const AdminList = ({ org }: Props) => {
  const { useFetchAllAdminsByOrgCodeQuery } = useStaff();
  const { data: staffs, isLoading } = useFetchAllAdminsByOrgCodeQuery(org.code);
  const staffList = staffs ?? [];

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
    <div className="md:col-span-2 bg-white border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="flex flex-row items-center justify-between pb-1 px-3 pt-3 flex-shrink-0">
        <h2 className="text-lg font-bold text-foreground">Admins</h2>
      </div>
      <div className="flex-1 overflow-y-auto pt-2 pb-3 px-3">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(1)].map((_, i) => (
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
                  {/* <Select value={staff.status}>
                    <SelectTrigger className="w-20 h-6 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select> */}
                  {/* <Button
                    onClick={() => handleRemoveClick(staff)}
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <div className="p-3 bg-blue-50 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium mb-2">No admins</div>
          </div>
        )}
      </div>
    </div>
  );
};

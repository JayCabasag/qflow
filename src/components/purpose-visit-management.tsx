import { ListChecks, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface PurposeOfVisit {
  id: string;
  name: string;
  description: string;
  estimatedTime: number; // in minutes
  isActive: boolean;
}

export default function PurposeVisitManagement() {
  const [newPurposeName, setNewPurposeName] = useState("");
  const [newPurposeDesc, setNewPurposeDesc] = useState("");
  const [newPurposeTime, setNewPurposeTime] = useState("");

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

  return (
    <>
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
                    purpose.isActive ? "bg-white" : "bg-gray-50 opacity-75"
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
    </>
  );
}

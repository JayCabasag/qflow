"use client";

import { Bell, X, Plus, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "alert";
  timestamp: string;
  dismissible?: boolean;
}

export function AnnouncementManagement() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "System Maintenance",
      message: "System will be down for maintenance on Sunday 2-4 AM",
      type: "alert",
      timestamp: "2 hours ago",
      dismissible: true,
    },
    {
      id: "2",
      title: "New Feature Released",
      message: "Check out our new advanced reporting dashboard",
      type: "success",
      timestamp: "1 day ago",
      dismissible: true,
    },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "success" | "alert",
  });

  const getIconAndColor = (type: string) => {
    switch (type) {
      case "alert":
        return {
          icon: AlertCircle,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-600",
        };
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-600",
        };
      case "warning":
        return {
          icon: AlertCircle,
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-600",
        };
      default:
        return {
          icon: Info,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-600",
        };
    }
  };

  const handleDismiss = (id: string) => {
    setDismissed([...dismissed, id]);
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.message.trim()) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        title: newAnnouncement.title,
        message: newAnnouncement.message,
        type: newAnnouncement.type,
        timestamp: "just now",
        dismissible: true,
      };
      setAnnouncements([announcement, ...announcements]);
      setNewAnnouncement({ title: "", message: "", type: "info" });
      setShowModal(false);
    }
  };

  const visibleAnnouncements = announcements.filter(
    (a) => !dismissed.includes(a.id)
  );

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm">Announcements</h3>
          <button
            onClick={() => setShowModal(true)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {visibleAnnouncements.length > 0 ? (
            visibleAnnouncements.map((announcement) => {
              const {
                icon: Icon,
                bgColor,
                textColor,
              } = getIconAndColor(announcement.type);

              return (
                <div
                  key={announcement.id}
                  className={`p-3 ${bgColor} flex gap-2 group hover:shadow-sm transition-shadow`}
                >
                  <Icon
                    className={`h-4 w-4 ${textColor} flex-shrink-0 mt-0.5`}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-gray-900">
                      {announcement.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {announcement.message}
                    </p>
                    <span className="text-xs text-gray-500 mt-1 inline-block">
                      {announcement.timestamp}
                    </span>
                  </div>

                  {announcement.dismissible && (
                    <button
                      onClick={() => handleDismiss(announcement.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-6 text-center">
              <Bell className="h-6 w-6 text-gray-300 mx-auto mb-1" />
              <p className="text-xs text-gray-500">No announcements</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Announcement</DialogTitle>
            <DialogDescription>
              Create a new announcement to notify users. Choose the type and add
              your message.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter announcement message"
                value={newAnnouncement.message}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    message: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newAnnouncement.type}
                onValueChange={(
                  value: "info" | "warning" | "success" | "alert"
                ) => setNewAnnouncement({ ...newAnnouncement, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select announcement type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAnnouncement}>Add Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

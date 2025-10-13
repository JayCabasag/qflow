"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketModal } from "./ticket-modal";
import { UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface QueueTicketModalData {
  name: string;
  phone: string;
  purpose: string;
  staff: string;
  ticketNumber?: string;
  timestamp?: Date;
}

interface Queue {
  org_code: string;
  staff_id: number;
  purpose_id: number;
  name: string;
  phone: string;
  ticket_number?: number;
  timestamp?: string;
  status?: string;
}

interface Purpose {
  id: number;
  org_code: string;
  name: string;
  order: number;
}

interface Staff {
  id: number;
  org_code: string;
  name: string;
  alias: string;
  created_at: string;
}

interface Props {
  org: string;
  staffs: Staff[];
  purposes: Purpose[];
}

export function RegistrationForm({ org, staffs, purposes }: Props) {
  const [formData, setFormData] = useState<Queue>({
    org_code: org,
    staff_id: 0,
    purpose_id: 0,
    name: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedTicket, setGeneratedTicket] =
    useState<QueueTicketModalData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check for existing entry first
      const { data: existingData, error: checkError } = await supabase
        .from("queue")
        .select("id")
        .eq("name", formData.name)
        .eq("phone", formData.phone)
        .eq("org_code", formData.org_code)
        .eq("purpose_id", formData.purpose_id)
        .eq("staff_id", formData.staff_id)
        .eq("status", "waiting") // Only check against waiting entries
        .maybeSingle();

      if (checkError) {
        console.error("Duplicate check error:", checkError);
        toast.error("Error", {
          description: "Failed to validate entry",
        });
        setIsSubmitting(false);
        return;
      }

      if (existingData) {
        toast.error("Duplicate entry", {
          description: "You already have a pending request in the queue.",
          icon: <XCircleIcon className="text-red-500 mx-4" />,
        });
        setIsSubmitting(false);
        return;
      }

      // Proceed with insert if no duplicate found
      const { data, error } = await supabase
        .from("queue")
        .insert([
          {
            ...formData,
            status: "waiting",
          },
        ])
        .select(
          `*,
          purpose:purpose_id (
            id,
            name
          ),
          staff:staff_id (
            id,
            name,
            alias
          )
        `
        )
        .single();

      if (error) {
        if (
          error.message.includes("duplicate") ||
          error.message.includes("violates")
        ) {
          toast.error("Already in Queue", {
            description:
              "You already have an active entry in the queue (waiting or being served).",
          });
        } else {
          toast.error("Registration Failed", {
            description: error.message,
          });
        }
        setIsSubmitting(false);
        return;
      }

      if (data) {
        setGeneratedTicket({
          name: data.name,
          phone: data.phone,
          purpose: data.purpose.purpose,
          staff: data.staff.name,
          ticketNumber: data.ticket_number?.toString(),
          timestamp: new Date(data.created_at),
        });

        toast.success("Registration Successful", {
          description: `Your ticket number is ${data.ticket_number}`,
        });

        // Reset form
        setFormData({
          org_code: org,
          name: "",
          phone: "",
          purpose_id: 0,
          staff_id: 0,
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Registration Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto bg-card border border-border rounded-none">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Visitor Registration</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Please fill in your details to join the queue
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Visit *</Label>
                <Select
                  value={
                    formData.purpose_id ? formData.purpose_id.toString() : ""
                  }
                  onValueChange={(value) =>
                    setFormData({ ...formData, purpose_id: parseInt(value) })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select purpose of visit" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposes.map((purpose) => (
                      <SelectItem
                        key={purpose.id}
                        value={purpose.id.toString()}
                      >
                        {purpose.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff">Staff/Teller to Meet *</Label>
                <Select
                  value={formData.staff_id ? formData.staff_id.toString() : ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, staff_id: parseInt(value) })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffs.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id.toString()}>
                        {staff.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.phone ||
                formData.purpose_id === 0 ||
                formData.staff_id === 0
              }
            >
              {isSubmitting ? "Generating Ticket..." : "Generate Queue Ticket"}
            </Button>
          </form>
        </div>
      </div>

      {generatedTicket && (
        <TicketModal
          ticket={generatedTicket}
          isOpen={!!generatedTicket}
          onClose={() => setGeneratedTicket(null)}
        />
      )}
    </>
  );
}

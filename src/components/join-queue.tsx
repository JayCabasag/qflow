"use client";

import type React from "react";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketModal } from "./ticket-modal";
import { UserPlus } from "lucide-react";
import { useOrg, usePurpose, useStaff } from "@/hooks";
import { Staff } from "@/hooks/domain/staff/schema";
import { Purpose } from "@/hooks/domain/purpose/schema";
import { ActionState } from "@/lib/auth/middleware";
import { joinQueue } from "@/app/[org]/join/actions";
import { OrgNotReady } from "./org-not-ready";

interface QueueTicketModalData {
  name: string;
  phone: string;
  purpose: string;
  staff: string;
  ticketNumber?: string;
  timestamp?: Date;
}

interface Props {
  org: string;
}

// Common countries list - use ISO code as unique identifier
const COUNTRIES = [
  { code: "+1", name: "United States", iso: "US" },
  { code: "+1", name: "Canada", iso: "CA" },
  { code: "+63", name: "Philippines", iso: "PH" },
  { code: "+44", name: "United Kingdom", iso: "GB" },
  { code: "+61", name: "Australia", iso: "AU" },
  { code: "+81", name: "Japan", iso: "JP" },
  { code: "+82", name: "South Korea", iso: "KR" },
  { code: "+86", name: "China", iso: "CN" },
  { code: "+91", name: "India", iso: "IN" },
  { code: "+49", name: "Germany", iso: "DE" },
  { code: "+33", name: "France", iso: "FR" },
  { code: "+39", name: "Italy", iso: "IT" },
  { code: "+34", name: "Spain", iso: "ES" },
  { code: "+7", name: "Russia", iso: "RU" },
  { code: "+55", name: "Brazil", iso: "BR" },
  { code: "+52", name: "Mexico", iso: "MX" },
  { code: "+27", name: "South Africa", iso: "ZA" },
  { code: "+20", name: "Egypt", iso: "EG" },
  { code: "+971", name: "United Arab Emirates", iso: "AE" },
  { code: "+65", name: "Singapore", iso: "SG" },
  { code: "+60", name: "Malaysia", iso: "MY" },
  { code: "+66", name: "Thailand", iso: "TH" },
  { code: "+84", name: "Vietnam", iso: "VN" },
  { code: "+62", name: "Indonesia", iso: "ID" },
];

export function JoinQueue({ org }: Props) {
  const { useFetchOneQuery } = useOrg();
  const { data, isLoading, isError } = useFetchOneQuery(org);
  const { useFetchAllByOrgQuery } = usePurpose();
  const { useFetchAllStaffsByOrgCodeQuery } = useStaff();
  const { data: purposeData } = useFetchAllByOrgQuery(org);
  const { data: staffData } = useFetchAllStaffsByOrgCodeQuery(org);

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    joinQueue,
    { error: "" }
  );

  const staffs = staffData ?? ([] as Staff[]);
  const purposes = purposeData ?? ([] as Purpose[]);

  const [generatedTicket, setGeneratedTicket] =
    useState<QueueTicketModalData | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string>(
    (state.phoneCountryCode as string) || "PH"
  );

  // Get phone code from ISO country code
  const getPhoneCodeFromIso = (iso: string) => {
    return COUNTRIES.find((c) => c.iso === iso)?.code || "+63";
  };

  if (isLoading) {
    return <div>Please wait...</div>;
  }

  if (isError) {
    return <div>Error..</div>;
  }

  if (!data || data.status != "active") {
    return <OrgNotReady />;
  }

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
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="orgCode" value={org} />
            <input
              type="hidden"
              name="phoneCountryCode"
              value={getPhoneCodeFromIso(selectedCountry)}
            />

            {state.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{state.error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={state.name as string}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="flex gap-2">
                  <Select
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                    required
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.iso} value={country.iso}>
                          {country.code} {country.iso}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={state.phone as string}
                    placeholder="9123456789"
                    className="flex-1"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter your phone number without the country code
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="staff">Personel to Meet *</Label>
                <Select
                  name="userOrgId"
                  defaultValue={state.userOrgId as string}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select staff member (optional)" />
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

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Visit *</Label>
                <Select
                  name="purposeId"
                  defaultValue={state.purposeId as string}
                  required
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select purpose" />
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
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isPending}
            >
              {isPending ? "Generating Ticket..." : "Generate Queue Ticket"}
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

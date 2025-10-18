"use client";

import { createOrg } from "@/app/dashboard/create-org/actions";
import { ActionState } from "@/lib/auth/middleware";
import { Building2, Shield, Upload, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";
import { OrgKeys, useOrg } from "@/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";

const industries = [
  "Healthcare",
  "Government",
  "Education",
  "Banking & Finance",
  "Retail",
  "Hospitality",
  "Transportation",
  "Other",
];

interface Props {
  user: SupabaseUser | null;
}

export function CreateOrgForm({ user }: Props) {
  const router = useRouter();
  const { invalidateQuery } = useOrg();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createOrg,
    { error: "" }
  );

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && state.success == "success") {
      [OrgKeys.fetchAllByUserIdQuery];
      toast.success("Purpose added successfully");
      state.success = "";
      router.back();
    }
  }, [isPending, state, invalidateQuery]);

  const checkCodeAvailability = async (code: string) => {
    if (code.length < 3) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <form action={formAction}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-600" />
                Organization Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Logo (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-sm border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0">
                      {logoPreview ? (
                        <Image
                          src={logoPreview}
                          alt="Logo preview"
                          className="h-full w-full object-cover rounded-sm"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        id="logo-file"
                        name="logoFile"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        defaultValue={state.logo as string}
                        className="hidden"
                      />
                      <input type="text" name="logo" className="hidden" />
                      <label
                        htmlFor="logo"
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Upload
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG or JPG (max. 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., City General Hospital"
                    defaultValue={state.name as string}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Organization Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="code"
                      required
                      defaultValue={state.code as string}
                      onChange={(e) => checkCodeAvailability(e.target.value)}
                      className={`w-full px-3 py-2 pr-9 text-sm border rounded-sm lowercase focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300`}
                      placeholder="e.g., city-general"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <Select
                    name="industry"
                    defaultValue={state.industry as string}
                    required
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    maxLength={500}
                    defaultValue={state.description as string}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Brief description of your organization..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                Primary Administrator
              </h3>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-sm border border-green-200 p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      User ID
                    </label>
                    <input
                      type="text"
                      value={user.id}
                      disabled
                      className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-sm bg-white/50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Auto-assigned from account
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Administrator Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Administrator"
                      className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-sm bg-white/50 text-gray-500 cursor-not-allowed"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="pt-3 border-t border-green-200">
                    <div className="flex gap-2">
                      <User className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          Admin Privileges
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Full access to manage organization, users, and
                          features
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-sm p-4">
                <p className="text-xs font-medium text-blue-900 mb-1">
                  What happens next?
                </p>
                <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
                  <li>Your organization will be created</li>
                  <li>{`You'll be assigned as the primary admin`}</li>
                  <li>Start with a 14-day free trial</li>
                  <li>Invite team members anytime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {state.error && (
          <div className="p-3 mt-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">{state.error}</p>
          </div>
        )}

        {/* Action Buttons - Fixed at bottom */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            By creating an organization, you agree to our Terms of Service
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-green-600 rounded-sm text-sm text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm min-w-[180px]"
            >
              {isPending ? "Creating..." : "Create Organization"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

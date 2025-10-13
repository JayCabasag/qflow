import { useOrg } from "@/hooks";
import { CreateOrgData, createOrgSchema } from "@/hooks/domain/org/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

export function CreateOrgForm() {
  const { useCreateOrgMutation } = useOrg();
  const createOrgMutation = useCreateOrgMutation();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrgData>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      industry: "",
    },
  });

  const orgCode = watch("code");

  const checkCodeAvailability = async (code: string) => {
    if (code.length < 3) {
      setCodeAvailable(null);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCodeAvailable(code !== "taken");
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

  const onSubmit = async (data: CreateOrgData) => {
    try {
      await createOrgMutation.mutateAsync({
        name: data.name,
        code: data.code,
        description: data.description,
        industry: data.industry,
        logo: logoPreview || undefined,
      });
    } catch (error) {
      console.error("Failed to create organization:", error);
    }
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Logo (Optional)
            </label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-full w-full object-cover rounded"
                  />
                ) : (
                  <Building2 className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </label>
                <p className="text-xs text-gray-500 mt-1.5">
                  PNG or JPG (max. 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-3 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., City General Hospital"
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Organization Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("code")}
                onChange={(e) => {
                  register("code").onChange(e);
                  checkCodeAvailability(e.target.value);
                }}
                className={`w-full px-3 py-2.5 pr-10 text-sm border rounded lowercase focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.code
                    ? "border-red-500"
                    : codeAvailable === false
                    ? "border-red-500"
                    : codeAvailable === true
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                placeholder="e.g., city-general"
              />
              {codeAvailable === true && (
                <Check className="absolute right-3 top-3 h-5 w-5 text-green-500" />
              )}
              {codeAvailable === false && (
                <X className="absolute right-3 top-3 h-5 w-5 text-red-500" />
              )}
            </div>
            {errors.code ? (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.code.message}
              </p>
            ) : codeAvailable === false ? (
              <p className="mt-1.5 text-sm text-red-600">
                This code is already taken
              </p>
            ) : codeAvailable === true ? (
              <p className="mt-1.5 text-sm text-green-600">
                ✓ Code is available
              </p>
            ) : (
              <p className="mt-1.5 text-sm text-gray-500">
                Your organization URL: qflow.app/{orgCode || "your-code"}
              </p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry <span className="text-red-500">*</span>
            </label>
            <select
              {...register("industry")}
              className={`w-full px-3 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.industry ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className={`w-full px-3 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Provide a brief description of your organization..."
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
            <p className="mt-1.5 text-xs text-gray-500">
              {watch("description")?.length || 0}/500 characters
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/home"
            className="px-5 py-2.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || codeAvailable === false}
            className="px-5 py-2.5 bg-green-600 rounded text-sm text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Start Free Trial"}
          </button>
        </div>
      </form>
    </div>
  );
}

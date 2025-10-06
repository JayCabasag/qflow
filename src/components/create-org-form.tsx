import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check, Info, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// Zod Schema for Organization Creation
const createOrgSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters"),
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must not exceed 20 characters")
    .regex(/^[a-z0-9-]+$/, "Code must be lowercase, numbers, and hyphens only")
    .transform((val) => val.toLowerCase()),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  industry: z.string().min(1, "Please select an industry"),
  address: z.string().optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
});

type CreateOrgFormData = z.infer<typeof createOrgSchema>;

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
  const router = useRouter();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [codeAvailable, setCodeAvailable] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrgFormData>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      industry: "",
      address: "",
      contactEmail: "",
      contactPhone: "",
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

  const onSubmit = async (data: CreateOrgFormData) => {
    console.log("Creating organization:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/home");
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Logo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="h-full w-full object-cover"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                  </label>
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG</p>
                </div>
              </div>
            </div>

            {/* Organization Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Organization Name *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-2.5 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="City Hospital"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Organization Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Organization Code *
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("code")}
                  onChange={(e) => {
                    register("code").onChange(e);
                    checkCodeAvailability(e.target.value);
                  }}
                  className={`w-full px-2.5 py-2 pr-8 text-sm border lowercase focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.code
                      ? "border-red-500"
                      : codeAvailable === false
                      ? "border-red-500"
                      : codeAvailable === true
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  placeholder="city-hospital"
                />
                {codeAvailable === true && (
                  <Check className="absolute right-2.5 top-2 h-4 w-4 text-green-500" />
                )}
                {codeAvailable === false && (
                  <X className="absolute right-2.5 top-2 h-4 w-4 text-red-500" />
                )}
              </div>
              {errors.code ? (
                <p className="mt-1 text-sm text-red-600">
                  {errors.code.message}
                </p>
              ) : codeAvailable === false ? (
                <p className="mt-1 text-sm text-red-600">Code unavailable</p>
              ) : codeAvailable === true ? (
                <p className="mt-1 text-sm text-green-600">Available</p>
              ) : (
                <p className="mt-1 text-sm text-gray-500">
                  URL: qflow.app/{orgCode || "your-code"}
                </p>
              )}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Industry *
              </label>
              <select
                {...register("industry")}
                className={`w-full px-2.5 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.industry ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description (Optional)
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className={`w-full px-2.5 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Brief description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Contact Information
            </h3>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Address *
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full px-2.5 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="123 Main St, City, State"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contact Email *
              </label>
              <input
                type="email"
                {...register("contactEmail")}
                className={`w-full px-2.5 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.contactEmail ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="contact@org.com"
              />
              {errors.contactEmail && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contact Phone *
              </label>
              <input
                type="tel"
                {...register("contactPhone")}
                className="w-full px-2.5 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* Pricing Disclaimer */}
            <div className="mt-6 p-3 bg-green-50 border border-green-200">
              <div className="flex gap-2">
                <Info className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-green-900 mb-1">
                    Free Trial Period
                  </h4>
                  <p className="text-sm text-green-800 mb-1.5">
                    Your first month is <strong>free</strong>. After 30 days, a
                    subscription fee is required. You'll receive a reminder 7
                    days before trial ends.
                  </p>
                  <p className="text-sm text-green-700">
                    By creating this organization, you agree to our{" "}
                    <Link href="/terms" className="underline font-medium">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/pricing" className="underline font-medium">
                      Pricing Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/home"
            className="px-5 py-2 border border-gray-300 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || codeAvailable === false}
            className="px-5 py-2 bg-green-600 text-sm text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Start Free Trial"}
          </button>
        </div>
      </form>
    </div>
  );
}

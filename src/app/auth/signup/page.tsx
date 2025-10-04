"use client";
import { CheckCircle, Mail, User, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // or your preferred toast library
import { useAuth } from "@/hooks";
import { SignUpData, signUpSchema } from "@/hooks/domain/auth";

export default function SignupPage() {
  const router = useRouter();
  const { useSignUpMutation } = useAuth();
  const signUpMutation = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      alias: "",
      terms: false,
      marketing_opt_in: false,
    },
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      await signUpMutation.mutateAsync(data);

      toast.success("Account created successfully!", {
        description: "Please check your email to verify your account.",
      });

      // Redirect to success page or login
      router.push("/auth/verify-email");
    } catch (error: any) {
      toast.error("Sign up failed", {
        description: error.message || "An error occurred during sign up",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Compact Hero */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Start Your Free Trial
        </h1>
        <p className="text-gray-600">
          14-day free trial • No credit card required • Full access
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Compact Benefits Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm border border-gray-200 p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Trial Includes:
            </h2>
            <div className="space-y-3">
              {[
                { title: "Full Platform Access", desc: "All QFlow features" },
                {
                  title: "500 Queue Entries",
                  desc: "Handle up to 500 customers",
                },
                {
                  title: "QR Code Generation",
                  desc: "Easy customer check-in",
                },
                {
                  title: "Real-time Analytics",
                  desc: "Track performance metrics",
                },
                { title: "24/7 Support", desc: "Get help anytime" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">10K+</div>
                  <div className="text-xs text-gray-600">Users</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">98%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    &lt;2min
                  </div>
                  <div className="text-xs text-gray-600">Setup</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Account Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3 text-sm">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="Enter your full name"
                        className={`w-full pl-8 pr-3 py-2 text-sm border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Alias/Username *
                    </label>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        {...register("alias")}
                        placeholder="Choose an alias or username"
                        className={`w-full pl-8 pr-3 py-2 text-sm border ${
                          errors.alias ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      />
                    </div>
                    {errors.alias && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.alias.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        {...register("email")}
                        className={`w-full pl-8 pr-3 py-2 text-sm border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="password"
                        {...register("password")}
                        className={`w-full pl-8 pr-3 py-2 text-sm border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Create password"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className={`w-full pl-8 pr-3 py-2 text-sm border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                        placeholder="Confirm password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Submit - Compact */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("terms")}
                      id="terms"
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-600">
                      I agree to the{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-green-600 hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("marketing_opt_in")}
                    id="marketing"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="marketing" className="text-xs text-gray-600">
                    Send me product updates and marketing communications
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || signUpMutation.isPending}
                    className="w-full bg-green-600 text-white py-3 px-4 font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || signUpMutation.isPending
                      ? "Creating Account..."
                      : "Start Free Trial"}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Your trial starts immediately. No credit card required.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

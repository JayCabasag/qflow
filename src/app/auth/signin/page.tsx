"use client";

import { useAuth } from "@/hooks";
import { SignInData, signInSchema } from "@/hooks/domain/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Code,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { useSignInMutation } = useAuth();
  const signInMutation = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInData) => {
    try {
      await signInMutation.mutateAsync(data);
    } catch (error: any) {
      // Server actions needs to redirect
      if (error.message === "NEXT_REDIRECT") {
        toast.success("Logged in successfully!", {
          description: "You can now use qflow to manage your queues.",
        });
        throw error; // MUST re-throw to allow redirect to happen
      }

      toast.error("Sign in failed", {
        description: error.message || "An error occurred during sign in",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Compact Hero */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">
          Sign in to your QFlow account to manage your queues
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Benefits Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm border border-gray-200 p-6 h-fit">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Why QFlow?
            </h2>
            <div className="space-y-3">
              {[
                {
                  icon: Clock,
                  title: "Save Time",
                  desc: "Reduce wait times by 70%",
                },
                {
                  icon: Users,
                  title: "Happy Customers",
                  desc: "Improve customer satisfaction",
                },
                {
                  icon: CheckCircle,
                  title: "Real-time Updates",
                  desc: "Live queue status and analytics",
                },
                {
                  icon: Shield,
                  title: "Secure & Reliable",
                  desc: "Enterprise-grade security",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3">
                Trusted by businesses worldwide
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">10K+</div>
                  <div className="text-xs text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">1M+</div>
                  <div className="text-xs text-gray-600">Queue Entries</div>
                </div>
              </div>
            </div>

            {/* Demo Link */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200">
              <p className="text-xs text-green-800 font-medium mb-1">
                New to QFlow?
              </p>
              <p className="text-xs text-green-700">
                <Link href="/demo-org" className="underline hover:no-underline">
                  Try our demo
                </Link>{" "}
                or{" "}
                <Link href="/signup" className="underline hover:no-underline">
                  start free trial
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm border border-gray-200 p-8">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sign In to Your Account
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full pl-10 pr-3 py-2.5 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`w-full pl-10 pr-10 py-2.5 border focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      id="rememberMe"
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-600"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-4 font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="text-green-600 font-medium hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
          <div className="h-3 w-3 bg-green-500"></div>
          <span>Secure login protected by enterprise-grade encryption</span>
        </div>
      </div>
    </div>
  );
}

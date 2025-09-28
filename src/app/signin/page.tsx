"use client";

import {
  ArrowLeft,
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
import { useState } from "react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    organizationCode: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Sign in submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Back</span>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-bold text-green-600">QFlow</div>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Compact Hero */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
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
                  <Link
                    href="/demo-org"
                    className="underline hover:no-underline"
                  >
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

                <div className="space-y-5">
                  {/* Organization code Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Code
                    </label>
                    <div className="relative">
                      <Code className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="organizationCode"
                        value={formData.organizationCode}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your organization code"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your password"
                        required
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
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-green-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-green-600 text-white py-3 px-4 font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Sign In
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        href="/signup"
                        className="text-green-600 font-medium hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
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
    </div>
  );
}

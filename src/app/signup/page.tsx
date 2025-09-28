"use client";

import {
  ArrowLeft,
  Building2,
  Users,
  CheckCircle,
  Mail,
  Phone,
  User,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    teamSize: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    marketing: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
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

              <div className="space-y-5">
                {/* Business Info - Compact Grid */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">
                    Business Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Business Name *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Business name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Type *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="clinic">Medical Clinic</option>
                          <option value="retail">Retail Store</option>
                          <option value="government">Government Office</option>
                          <option value="bank">Bank/Financial</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Team Size *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <select
                          name="teamSize"
                          value={formData.teamSize}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        >
                          <option value="">Size</option>
                          <option value="1-5">1-5</option>
                          <option value="6-20">6-20</option>
                          <option value="21-50">21-50</option>
                          <option value="51+">51+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info - Compact Grid */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Create password"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit - Compact */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="terms"
                      id="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      required
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

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="marketing"
                      id="marketing"
                      checked={formData.marketing}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label
                      htmlFor="marketing"
                      className="text-xs text-gray-600"
                    >
                      Send me product updates and marketing communications
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-green-600 text-white py-3 px-4 font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Start Free Trial
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Your trial starts immediately. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  Bell,
  Building2,
  Users,
  Clock,
  Monitor,
  ChevronRight,
  Plus,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export default function DashboardHome() {
  const [notifications] = useState(3);

  // Mock data - replace with real data from your API
  const organizations = [
    {
      id: 1,
      name: "City Hospital",
      logo: "🏥",
      role: "Admin",
      stats: {
        todayServed: 145,
        currentWaiting: 23,
        activeCounters: 8,
      },
    },
    {
      id: 2,
      name: "Downtown Clinic",
      logo: "🏢",
      role: "Staff",
      stats: {
        todayServed: 67,
        currentWaiting: 12,
        activeCounters: 4,
      },
    },
    {
      id: 3,
      name: "Municipal Office",
      logo: "🏛️",
      role: "Admin",
      stats: {
        todayServed: 203,
        currentWaiting: 45,
        activeCounters: 12,
      },
    },
  ];

  const userEmail = "user@example.com";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                Q
              </div>
              <h1 className="text-xl font-bold text-gray-900">QFlow</h1>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Welcome back
                  </p>
                  <p className="text-xs text-gray-600">{userEmail}</p>
                </div>
                <div className="h-8 w-8 bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm rounded-full">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Settings & Logout */}
              <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                <button className="p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            My Organizations
          </h2>
          <p className="text-gray-600">
            Select an organization to manage queues and view analytics
          </p>
        </div>

        {/* Create New Organization Button */}
        <div className="mb-6">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <Plus className="h-4 w-4" />
            Create New Organization
          </button>
        </div>

        {/* Organizations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-green-50 flex items-center justify-center text-2xl">
                      {org.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {org.name}
                      </h3>
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-medium mt-1 ${
                          org.role === "Admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {org.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Stats */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Today Served */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Today Served</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {org.stats.todayServed}
                    </span>
                  </div>

                  {/* Current Waiting */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Current Waiting</span>
                    </div>
                    <span className="font-semibold text-orange-600">
                      {org.stats.currentWaiting}
                    </span>
                  </div>

                  {/* Active Counters */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Monitor className="h-4 w-4" />
                      <span className="text-sm">Active Counters</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      {org.stats.activeCounters}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <button className="w-full bg-green-600 text-white py-2.5 px-4 font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2">
                  View Organization
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (show when no organizations) */}
        {organizations.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mb-4">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Organizations Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first organization to start managing queues
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium hover:bg-green-700 transition-colors">
              <Plus className="h-5 w-5" />
              Create Organization
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="h-3 w-3 bg-green-500"></div>
            <span>Secure and reliable queue management system</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

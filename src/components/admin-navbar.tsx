"use client";

import { Bell, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface Props {
  email: string;
  notifications: number;
}

export function AdminNavbar({ email, notifications }: Props) {
  const { useSignOutMutation } = useAuth();
  const signOutMutation = useSignOutMutation();

  const handleLogout = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log("User signed out successfully");
      },
      onError: (error) => {
        console.error("Logout failed", error);
      },
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href={"/home"}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                Q
              </div>
              <h1 className="text-xl font-bold text-gray-900">QFlow</h1>
            </div>
          </Link>

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
                <p className="text-xs text-gray-600">{email}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm rounded-full">
                {email.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Settings & Logout */}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <button className="p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                <Settings className="h-5 w-5" />
              </button>

              {/* Confirmation dialog */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be signed out of your account. You can log back
                      in anytime.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

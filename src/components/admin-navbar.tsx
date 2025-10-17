"use client";

import { Check, Copy, LogOut } from "lucide-react";
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
import { User } from "@supabase/supabase-js";
import { useState } from "react";

interface Props {
  email: string;
  notifications: number;
  user: User | null;
}

export function AdminNavbar({ user, email }: Props) {
  const { useSignOutMutation } = useAuth();
  const signOutMutation = useSignOutMutation();

  const [copied, setCopied] = useState(false);

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

  const formatIdentifier = (id: string) => {
    if (!id) return "";
    return `${id.slice(0, 6)}...${id.slice(-4)}`;
  };

  const handleCopy = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={"/dashboard"}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                Q
              </div>
              <h1 className="hidden md:block text-xl font-bold text-gray-900">
                QFlow
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <div
                className={`inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 transition-colors`}
                onClick={() => handleCopy(user.id)}
                title="Click to copy"
              >
                <span className="text-sm font-mono text-foreground">
                  {formatIdentifier(user.id)}
                </span>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            )}

            <div className="flex items-center gap-3 md:pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="hidden md:block text-sm font-medium text-gray-900">
                  Welcome back
                </p>
                <p className="hidden md:block text-sm text-gray-600">{email}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm rounded-full">
                {email.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Settings & Logout */}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
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

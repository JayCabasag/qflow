"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function OrgNotReady() {
  return (
    <div className="bg-gradient-to-br flex items-center justify-center md:p-4 pt-8">
      <div className="max-w-md w-full">
        <div className="p-4 md:p-8 text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto bg-amber-50 rounded-full flex items-center justify-center">
              <AlertCircle className="h-16 w-16 text-amber-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Organization Not Ready
          </h1>

          <p className="text-gray-600 mb-2">
            {`This organization is currently not available or hasn't been set up
            yet.`}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Please check back soon or contact the administrator for more
            information.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-full h-10 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Home
          </Link>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              If you believe this is an error, please contact support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

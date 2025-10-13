"use client";

import { useAuth } from "@/hooks";
import { Mail, CheckCircle, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your@email.com";

  const { useResendVerificationMutation } = useAuth();
  const [resendCount, setResendCount] = useState(0);

  const {
    mutate: resendEmail,
    isPending,
    isSuccess,
    isError,
    error,
  } = useResendVerificationMutation();

  const handleResendEmail = () => {
    if (resendCount >= 3) {
      return;
    }

    resendEmail(email, {
      onSuccess: () => {
        setResendCount((prev) => prev + 1);
      },
    });
  };

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white shadow-sm border border-gray-200 p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center h-16 w-16 bg-green-50 border-2 border-green-200 rounded-full mb-6">
            <Mail className="h-8 w-8 text-green-600" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 mb-6">Weve sent a verification link to</p>
          <p className="text-sm font-medium text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200 mb-8">
            {email}
          </p>

          {/* Instructions */}
          <div className="text-left space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">1</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Check your inbox
                </h3>
                <p className="text-sm text-gray-600">
                  {`Look for an email from QFlow with the subject "Verify your
                  email address"`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">2</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Click the verification link
                </h3>
                <p className="text-sm text-gray-600">
                  This will activate your account and redirect you to your
                  dashboard
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-600">3</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Start using QFlow
                </h3>
                <p className="text-sm text-gray-600">
                  Set up your organization and begin managing queues
                </p>
              </div>
            </div>
          </div>

          {/* Resend Section */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Didn&apos;t receive the email?
            </p>

            {isSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-sm text-green-800 flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Email sent successfully!
              </div>
            )}

            {isError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-sm text-red-800 text-center">
                {error?.message || "Failed to send email"}
              </div>
            )}

            {resendCount >= 3 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-sm text-red-800 text-center">
                Maximum resend attempts reached. Please contact support.
              </div>
            )}

            <button
              onClick={handleResendEmail}
              disabled={isPending || resendCount >= 3}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </button>

            {resendCount > 0 && resendCount < 3 && (
              <p className="text-xs text-gray-500 mt-2">
                {resendCount}/3 attempts used
              </p>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              Check your spam folder if you don&apos;t see it in your inbox
            </p>
            <p className="text-xs text-gray-600">
              Need help?{" "}
              <Link
                href="/support"
                className="text-green-600 font-medium hover:underline"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Sign In */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}

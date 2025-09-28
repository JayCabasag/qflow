"use client";

import { useRouter } from "next/navigation";
import Clock from "./clock";

interface Props {
  org: string;
}

export function Navbar({ org }: Props) {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(`/${org}`);
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={handleGoHome}>
              <img src="/logo.png" alt="QFlow" className="h-12 w-auto" />
            </button>
          </div>
          <div className="text-right h-12">
            <Clock />
          </div>
        </div>
      </div>
    </div>
  );
}

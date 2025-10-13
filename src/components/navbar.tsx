"use client";

import Clock from "./clock";
import Link from "next/link";

interface Props {
  org: string;
}

export function Navbar({ org }: Props) {
  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${org}`} className="flex items-center gap-2">
              <div className="text-xl font-bold text-green-600">QFlow</div>
            </Link>
          </div>
          <div className="text-right h-12">
            <Clock />
          </div>
        </div>
      </div>
    </div>
  );
}

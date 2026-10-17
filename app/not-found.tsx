import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6 font-sans">
      <div className="w-16 h-16 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] flex items-center justify-center mx-auto shadow-soft">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-mono font-bold text-[#3157D5] uppercase tracking-wider">
          ERROR 404 • PAGE NOT FOUND
        </div>
        <h1 className="font-editorial text-4xl font-bold text-[#172033]">
          The Requested Resource Does Not Exist
        </h1>
        <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
          The program track or credential page you were looking for could not be located in our registry.
        </p>
      </div>

      <div className="pt-4 flex justify-center gap-4 text-xs font-semibold">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] hover:bg-[#F8FAFC] shadow-soft transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/tracks"
          className="px-5 py-2.5 rounded-xl bg-[#3157D5] text-white hover:bg-[#193B8F] shadow-sm transition-colors"
        >
          Browse All Programs
        </Link>
      </div>
    </div>
  );
}

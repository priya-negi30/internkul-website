"use client";

import React, { useRef } from "react";
import { CredentialRecord } from "@/types";
import { ShieldCheck, Printer, GraduationCap } from "lucide-react";

interface CertificatePreviewProps {
  credential: CredentialRecord;
}

export function CertificatePreview({ credential }: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-sans text-[#64748B]">
          <ShieldCheck className="w-4 h-4 text-[#0F9F6E]" />
          <span>Cryptographically Authenticated Credential Dossier</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans font-semibold text-[#172033] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] shadow-soft transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-[#3157D5]" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Actual Certificate Document Canvas (Printable) */}
      <div
        ref={certificateRef}
        id="printable-certificate"
        className="w-full bg-white border-4 border-double border-[#193B8F] rounded-2xl p-8 sm:p-14 relative overflow-hidden shadow-card font-sans text-[#172033]"
      >
        {/* Subtle decorative inner border */}
        <div className="absolute inset-3 border border-[#E2E8F0] pointer-events-none rounded-xl" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-[#E2E8F0] gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3157D5] to-[#193B8F] flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-editorial text-3xl font-bold tracking-tight text-[#172033]">
                internkul
              </div>
              <div className="text-[10px] uppercase text-[#64748B] tracking-widest font-sans font-semibold mt-0.5">
                Technical Education & Credential Registry
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[10px] text-[#64748B] uppercase font-sans font-semibold">Credential Identifier</div>
            <div className="text-base font-mono font-bold text-[#193B8F] tracking-wider mt-0.5">
              {credential.id}
            </div>
            <div className="text-[11px] text-[#64748B] mt-0.5">
              Date of Issue: {credential.issueDate}
            </div>
          </div>
        </div>

        {/* Body Copy */}
        <div className="py-10 text-center space-y-4 relative z-10">
          <div className="text-xs uppercase tracking-widest text-[#3157D5] font-semibold font-sans">
            Certificate of Completion — Aon Digicon LLP
          </div>

          <div className="text-sm text-[#64748B] max-w-lg mx-auto">
            This is to certify that
          </div>

          <div className="text-3xl sm:text-5xl font-editorial font-bold text-[#172033] tracking-tight py-2">
            {credential.studentName}
          </div>

          <div className="text-xs text-[#64748B]">
            Affiliated Degree: <strong className="text-[#172033]">{credential.degree}</strong>
            <br />
            {credential.collegeName}
          </div>

          <div className="text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed pt-2">
            has successfully completed the live practical engineering cohort in{" "}
            <strong className="text-[#193B8F]">{credential.trackName}</strong> ({credential.durationDays}-Day Comprehensive Immersion) with verified Git commits, continuous integration testing, and capstone deployment.
          </div>
        </div>

        {/* Capstone info */}
        <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-left mb-6 relative z-10">
          <div className="text-[10px] text-[#64748B] uppercase font-semibold mb-1 font-sans">
            Verified Capstone Production Project
          </div>
          <div className="text-sm font-bold text-[#172033] mb-1 font-editorial">
            {credential.capstoneTitle}
          </div>
          <div className="text-xs text-[#64748B] leading-relaxed">
            {credential.capstoneDescription}
          </div>
        </div>

        {/* Skills Tagged */}
        <div className="space-y-2 mb-10 text-left relative z-10">
          <div className="text-[10px] text-[#64748B] uppercase font-semibold font-sans">
            Assessed & Verified Technical Competencies
          </div>
          <div className="flex flex-wrap gap-2">
            {credential.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-[#EEF4FF] border border-[#D8E5FF] text-xs font-mono font-medium text-[#193B8F]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Signatures & QR Registry */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 relative z-10">
          {/* QR representation */}
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 bg-white p-1 rounded-xl border border-[#CBD5E1] flex flex-col items-center justify-center shadow-soft">
              <svg viewBox="0 0 24 24" className="w-full h-full text-[#172033] fill-current">
                <path d="M2 2h8v8H2zm2 2v4h4V4zm-2 10h8v8H2zm2 2v4h4v-4zm10-14h8v8h-8zm2 2v4h4V4zm-1 9h2v2h-2zm3 0h2v2h-2zm-3 3h2v2h-2zm3 0h2v2h-2zm-3 3h5v2h-5z" />
              </svg>
            </div>
            <div className="text-left text-xs font-sans">
              <div className="text-[#0F9F6E] font-bold">STATUS: VERIFIED</div>
              <div className="text-[#64748B] text-[11px]">Public Registry:</div>
              <div className="text-[#3157D5] font-mono text-[11px] underline">
                internkul.dev/verify/{credential.id}
              </div>
            </div>
          </div>

          {/* Signature block */}
          <div className="text-left sm:text-right space-y-1">
            <div className="font-editorial italic text-lg text-[#172033]">
              Aon Digicon LLP
            </div>
            <div className="w-48 h-0.5 bg-[#3157D5] ml-0 sm:ml-auto" />
            <div className="text-xs text-[#64748B]">
              {credential.verifiedBy}
            </div>
            <div className="text-[11px] text-[#94A3B8]">
              internkul • Built in Chhattisgarh, India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

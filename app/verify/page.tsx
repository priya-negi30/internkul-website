"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
const SAMPLE_CREDENTIAL_IDS = [
  "CG-2026-MERN-104",
  "CG-2026-PYAI-208",
  "CG-2026-DATA-315",
  "CG-2026-IOT-412",
];

export default function VerifySearchPage() {
  const router = useRouter();
  const [certId, setCertId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const sampleIds = SAMPLE_CREDENTIAL_IDS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = certId.trim().toUpperCase();
    if (!cleanId) {
      setErrorMsg("Please enter a valid certificate ID");
      return;
    }
    router.push(`/verify/${cleanId}`);
  };

  const handleSelectSample = (id: string) => {
    setCertId(id);
    router.push(`/verify/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">
      {/* Central Verification Interface */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 sm:p-12 space-y-6 shadow-card font-sans">
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] text-xs text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F9F6E]" />
            <span className="text-[#172033] font-bold">internkul Public Credential Registry</span>
          </div>
          <div className="text-xs font-mono font-medium text-[#3157D5]">
            [SHA-256 AUTHENTICATED]
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="font-editorial text-3xl font-bold text-[#172033]">
              Verify Student Credential & Proof of Work
            </h1>
            <p className="text-sm text-[#64748B] mt-1 font-sans">
              Authenticate industrial training certificates, live capstone deployments, Git commit histories, and evaluated skills.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs uppercase text-[#64748B] font-semibold tracking-wider mb-2">
                Enter Certificate Identifier (Format: CG-YEAR-TRACK-NUM)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => {
                    setCertId(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="e.g. CG-2026-MERN-104"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#CBD5E1] text-[#172033] font-mono text-sm sm:text-base tracking-wider focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#EEF4FF] uppercase shadow-soft"
                />
              </div>
              {errorMsg && (
                <span className="text-xs text-rose-500 mt-1.5 block font-medium">
                  {errorMsg}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#3157D5] text-white font-sans text-xs font-semibold hover:bg-[#193B8F] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <span>Verify Credential Registry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick sample chips for testing */}
          <div className="pt-5 border-t border-[#F1F5F9] text-xs text-[#64748B] space-y-2.5">
            <div className="text-[11px] uppercase text-[#64748B] font-semibold tracking-wider">
              Sample Identifiers (Click to test verification):
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleIds.map((id) => (
                <button
                  key={id}
                  onClick={() => handleSelectSample(id)}
                  className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-medium text-[#172033] hover:bg-[#EEF4FF] hover:border-[#D8E5FF] hover:text-[#3157D5] transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sample Credentials Showcase */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 shadow-card font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F1F5F9] gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[11px] font-semibold text-[#193B8F] uppercase tracking-wider">
                Sample Credentials
              </span>
              <span className="text-[11px] font-mono text-[#0F9F6E] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verifiable Formats</span>
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#172033]">
              See What Your Credential Looks Like
            </h2>
            <p className="text-sm text-[#64748B] mt-1 font-sans max-w-2xl leading-relaxed">
              Explore a sample certificate and digital badge issued after successfully completing an AON Digicon training or internship program.
            </p>
          </div>
        </div>

        {/* Side-by-side row on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Sample Certificate */}
          <div className="md:col-span-7 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-soft group hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[10px] font-mono font-bold uppercase text-[#193B8F] shadow-xs">
                  Sample
                </span>
                <span className="text-xs font-bold text-[#172033]">Sample Certificate</span>
              </div>
              <span className="text-[11px] text-[#64748B] font-mono">
                Print & Dossier Ready
              </span>
            </div>

            {/* Certificate Visual Presentation */}
            <div className="relative rounded-lg overflow-hidden border border-[#E2E8F0] bg-white shadow-soft group-hover:shadow-card transition-all duration-300">
              <Image
                src="/images/certificate.png"
                alt="Sample AON Digicon training and internship certificate"
                width={1200}
                height={896}
                className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-0.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9F6E]" />
                <span>Formal Industrial Training Completion</span>
              </span>
              <span className="font-mono text-[#475569]">AON Digicon LLP</span>
            </div>
          </div>

          {/* Sample Digital Badge */}
          <div className="md:col-span-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-soft group hover:border-[#CBD5E1] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[10px] font-mono font-bold uppercase text-[#193B8F] shadow-xs">
                  Sample
                </span>
                <span className="text-xs font-bold text-[#172033]">Sample Digital Badge</span>
              </div>
              <span className="text-[11px] text-[#64748B] font-mono">
                LinkedIn & Web
              </span>
            </div>

            {/* Digital Badge Sticker Visual Presentation */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg bg-white border border-[#E2E8F0] shadow-soft relative overflow-hidden min-h-[220px]">
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#EEF4FF] via-[#F2F3FF] to-transparent blur-xl pointer-events-none" />

              {/* Floating subtle animation with hover lift */}
              <div className="relative animate-float-subtle transition-transform duration-300 ease-out hover:scale-105 cursor-pointer">
                <Image
                  src="/images/sample-digital-badge.png"
                  alt="Sample AON Digicon verified digital credential badge"
                  width={340}
                  height={340}
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_12px_24px_rgba(25,59,143,0.16)] hover:drop-shadow-[0_16px_30px_rgba(49,87,213,0.25)] transition-all duration-300"
                  sizes="220px"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-0.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9F6E]" />
                <span>Verified Online Digital Credential</span>
              </span>
              <span className="font-mono text-[#475569]">AON Digicon LLP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Verification Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card">
          <div className="flex items-center gap-2 text-[#172033] font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-[#0F9F6E]" />
            <span>For College HODs & TPOs</span>
          </div>
          <p className="text-[#64748B] leading-relaxed text-xs">
            Instantly authenticate student industrial training completion. Confirm session contact hours (20h to 95h), authentic GitHub project repositories, and daily session journal validity without waiting for postal letters.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-card">
          <div className="flex items-center gap-2 text-[#172033] font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-[#3157D5]" />
            <span>For Recruiters & Hiring Squads</span>
          </div>
          <p className="text-[#64748B] leading-relaxed text-xs">
            Review actual production deployments and code quality scores. Verify that candidate credentials represent tested code, git commits, and architectural defense rather than passive attendance.
          </p>
        </div>
      </div>

      {/* Verified Parameters List */}
      <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 font-sans text-xs shadow-soft">
        <div className="text-[#172033] uppercase text-xs font-bold tracking-wider">
          What is Authenticated on Each Credential Record:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#475569]">
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ Student Identity & Degree</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ Course & Duration Tier</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ Issue Date & Seal</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ Live GitHub Repo</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ Production App URL</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ Assessed Skills Matrix</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ PPO Evaluation Score</div>
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">✓ AICTE Deliverables</div>
        </div>
      </div>
    </div>
  );
}

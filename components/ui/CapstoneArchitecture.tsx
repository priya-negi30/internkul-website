import React from "react";
import { CapstoneSpec } from "@/types";
import { Layers, GitBranch, Server, Database, ShieldAlert, FileText } from "lucide-react";
import Link from "next/link";

interface CapstoneArchitectureProps {
  capstone: CapstoneSpec;
  trackName: string;
}

export function CapstoneArchitecture({ capstone, trackName }: CapstoneArchitectureProps) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-6 shadow-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F1F5F9] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] font-semibold">
              CAPSTONE PRODUCTION PROJECT
            </span>
            {capstone.academicDocReady && (
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#0F9F6E] font-semibold">
                AICTE FORMAT READY
              </span>
            )}
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#172033] mt-2">
            {capstone.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/internship-matrix"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] text-xs font-sans font-medium text-[#475569] hover:text-[#172033] hover:border-[#CBD5E1] transition-colors shadow-soft"
          >
            <FileText className="w-3.5 h-3.5 text-[#3157D5]" />
            <span>View Project Report Specs</span>
          </Link>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="space-y-1.5">
        <div className="text-xs font-sans font-semibold uppercase tracking-wider text-[#64748B]">
          Industry Problem Statement
        </div>
        <p className="text-sm text-[#475569] leading-relaxed font-sans">
          {capstone.problemStatement}
        </p>
      </div>

      {/* Architecture Pipeline Visualizer */}
      <div className="space-y-2">
        <div className="text-xs font-sans font-semibold uppercase tracking-wider text-[#172033] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#3157D5]" />
          <span>Production Architecture & Component Flow</span>
        </div>

        <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
          <div className="text-sm font-sans font-bold text-[#193B8F] leading-relaxed">
            {capstone.architecture}
          </div>
          <div className="text-[#64748B] text-xs flex flex-wrap items-center gap-3 pt-2.5 border-t border-[#E2E8F0]">
            <span className="flex items-center gap-1 font-medium">
              <Server className="w-3.5 h-3.5 text-[#3157D5]" /> Microservice Gateway
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="flex items-center gap-1 font-medium">
              <Database className="w-3.5 h-3.5 text-[#3157D5]" /> Replicated Database
            </span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="flex items-center gap-1 font-medium">
              <GitBranch className="w-3.5 h-3.5 text-[#3157D5]" /> GitHub Actions CI/CD
            </span>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-2.5">
        <div className="text-xs font-sans font-semibold uppercase tracking-wider text-[#64748B]">
          Core Subsystems & Practical Modules
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {capstone.modules.map((mod, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-3 shadow-soft"
            >
              <span className="font-mono text-xs font-bold text-[#3157D5] bg-[#EEF4FF] px-2 py-0.5 rounded-md border border-[#D8E5FF] shrink-0">
                M0{idx + 1}
              </span>
              <span className="text-xs text-[#172033] font-medium leading-relaxed">
                {mod}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Repository Structure & Deployment Target */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
          <div className="text-[#64748B] text-[11px] font-semibold uppercase mb-1">
            Deployment Target & Runtime
          </div>
          <div className="text-[#172033] font-semibold">
            {capstone.deploymentTarget}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
          <div className="text-[#64748B] text-[11px] font-semibold uppercase mb-1">
            Repository Architecture
          </div>
          <div className="text-[#172033] font-semibold">
            {capstone.repositoryStructure}
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="p-4 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs text-[#193B8F] flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[#3157D5] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Academic Compliance Notice:</span>{" "}
          Deliverables are structured to align with university and institutional industrial training documentation standards. University guidelines vary by institution; candidates submit their formal Project Report dossier and Letter of Recommendation to their respective college departmental committees.
        </div>
      </div>
    </div>
  );
}

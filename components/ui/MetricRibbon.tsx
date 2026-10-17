import React from "react";
import { Users, GitPullRequest, Rocket, Award } from "lucide-react";

interface MetricRibbonProps {
  metrics?: {
    activeCohorts: string;
    verifiedCodeReviews: string;
    deployedApps: string;
    academicApprovalRate: string;
  };
}

export function MetricRibbon({
  metrics = {
    activeCohorts: "04",
    verifiedCodeReviews: "1,284",
    deployedApps: "317",
    academicApprovalRate: "99.2%",
  },
}: MetricRibbonProps) {
  const items = [
    {
      icon: Users,
      label: "Active Cohorts",
      value: metrics.activeCohorts,
      subtext: "LIVE NON-CONFLICTING BATCHES",
    },
    {
      icon: GitPullRequest,
      label: "Verified Code Reviews",
      value: metrics.verifiedCodeReviews,
      subtext: "PULL REQUESTS GRADED",
    },
    {
      icon: Rocket,
      label: "Deployed Applications",
      value: metrics.deployedApps,
      subtext: "LIVE PRODUCTION WORKFLOWS",
    },
    {
      icon: Award,
      label: "Academic Approval Rate",
      value: metrics.academicApprovalRate,
      subtext: "AICTE & UNIVERSITY COMPLIANT",
    },
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl shadow-card p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#F1F5F9] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0F9F6E]" />
          <span className="text-[#172033] font-semibold">Live Training Telemetry</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#64748B]">Active Cohort Registry</span>
        </div>
        <div className="text-[#64748B] font-mono text-[11px]">
          [REGION: CENTRAL INDIA • LATENCY: 24ms]
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#F1F5F9]">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${idx !== 0 ? "sm:pl-6 pt-3 sm:pt-0" : ""}`}
          >
            <div className="flex items-center gap-2 text-[#64748B] text-xs font-medium mb-1">
              <item.icon className="w-4 h-4 text-[#3157D5]" />
              <span>{item.label}</span>
            </div>
            <div className="text-3xl font-editorial font-bold tracking-tight text-[#172033]">
              {item.value}
            </div>
            <div className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mt-1">
              [{item.subtext}]
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { CurriculumDay } from "@/types";
import { GitCommit, ChevronDown, ChevronRight, Terminal, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface GitCommitCurriculumProps {
  days: CurriculumDay[];
  durationLabel: string;
}

export function GitCommitCurriculum({ days, durationLabel }: GitCommitCurriculumProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(days[0]?.day ?? 1);

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2">
        <div className="flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-[#3157D5]" />
          <span className="font-sans text-xs uppercase tracking-wider text-[#172033] font-bold">
            Curriculum Progression & Git Milestones
          </span>
          <span className="text-xs text-[#64748B]">
            ({durationLabel} Cohort Journey)
          </span>
        </div>
        <div className="text-xs text-[#64748B]">
          Click milestones to view daily session assignments & topics
        </div>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
        {days.map((item) => {
          const isExpanded = expandedDay === item.day;

          return (
            <div key={item.day} className="relative group">
              {/* Timeline Node */}
              <div
                onClick={() => toggleDay(item.day)}
                className={cn(
                  "absolute -left-6 top-3 w-4 h-4 rounded-full border-2 cursor-pointer transition-all flex items-center justify-center bg-white",
                  isExpanded
                    ? "border-[#3157D5] ring-4 ring-[#EEF4FF]"
                    : "border-[#CBD5E1] hover:border-[#3157D5]"
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", isExpanded ? "bg-[#3157D5]" : "bg-transparent")} />
              </div>

              {/* Commit Item Card */}
              <div
                className={cn(
                  "rounded-xl border transition-all overflow-hidden",
                  isExpanded
                    ? "bg-white border-[#3157D5] shadow-card"
                    : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-soft"
                )}
              >
                {/* Header / Clickable summary */}
                <div
                  onClick={() => toggleDay(item.day)}
                  className="p-4 cursor-pointer flex items-start sm:items-center justify-between gap-3 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#172033]">
                        Day {item.day < 10 ? `0${item.day}` : item.day}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                        commit: {item.commitHash}
                      </span>
                      <span className="text-xs font-mono text-[#3157D5] font-medium">
                        {item.commitMessage}
                      </span>
                    </div>

                    <div className="text-sm font-sans font-semibold text-[#172033]">
                      {item.milestoneTitle}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#64748B]">
                      <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                      {item.hours}h Session
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#3157D5]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#F1F5F9] bg-[#F8FAFC] space-y-4 text-xs">
                    {/* Topics bullet list */}
                    <div>
                      <div className="text-xs font-semibold text-[#172033] mb-2 uppercase tracking-wider">
                        Core Concepts & Topics
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.topics.map((topic, tidx) => (
                          <div
                            key={tidx}
                            className="flex items-center gap-2 text-[#475569] font-sans text-xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3157D5]" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Practical Deliverable */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start gap-2.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#0F9F6E] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-sans text-[#64748B] uppercase font-semibold">
                          Verified Practical Deliverable
                        </div>
                        <p className="text-[#172033] text-xs font-medium mt-0.5">
                          {item.practicalDeliverable}
                        </p>
                      </div>
                    </div>

                    {/* Code Snippet if present */}
                    {item.codeSnippet && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-sans text-[#64748B] uppercase font-semibold flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#3157D5]" />
                          <span>Code Implementation Pattern</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                          <code>{item.codeSnippet}</code>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

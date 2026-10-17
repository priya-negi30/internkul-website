"use client";

import React from "react";
import { CohortDuration } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

interface DurationOptionInfo {
  duration: CohortDuration;
  tierName: string;
  days: number;
  sessions?: number;
  labHours?: number;
  originalPriceINR?: number;
  discountPercent?: number;
  priceINR: number;
  academicSupportEligible: boolean;
  lorEligible?: boolean;
  ppoEligible?: boolean;
  features?: string[];
}

interface DurationSelectorProps {
  selectedDuration: CohortDuration;
  onSelectDuration: (duration: CohortDuration) => void;
  durationOptions?: Record<CohortDuration, DurationOptionInfo>;
}

export function DurationSelector({
  selectedDuration,
  onSelectDuration,
  durationOptions,
}: DurationSelectorProps) {
  const durations: { id: CohortDuration; daysLabel: string; tier: string; tag: string }[] = [
    { id: "1D", daysLabel: "1 Day", tier: "Workshop", tag: "ATTENDANCE ONLY" },
    { id: "10D", daysLabel: "10 Days", tier: "Skill Sprint", tag: "FOCUSED SPRINT" },
    { id: "20D", daysLabel: "20 Days", tier: "Skill Sprint", tag: "SKILL BUILDING" },
    { id: "30D", daysLabel: "30 Days", tier: "Marathon", tag: "ACADEMIC TRAINING" },
    { id: "45D", daysLabel: "45 Days", tier: "Internship Pack", tag: "INTERNSHIP PACK + PPO" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#172033] flex items-center gap-1.5">
          <span>Cohort Duration & Intensity Tier</span>
        </label>
        <span className="text-xs font-sans text-[#64748B] hidden sm:inline">
          Live instructor sessions with side-by-side practical coding
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {durations.map(({ id, daysLabel, tier, tag }) => {
          const isSelected = selectedDuration === id;
          const opt = durationOptions ? durationOptions[id] : null;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectDuration(id)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between group",
                isSelected
                  ? "bg-[#EEF4FF] border-[#3157D5] shadow-sm ring-1 ring-[#3157D5]"
                  : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] cursor-pointer shadow-soft"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#3157D5]">
                    [{daysLabel}]
                  </span>
                  {opt?.ppoEligible ? (
                    <span className="text-[10px] font-mono font-medium text-[#193B8F] bg-[#D8E5FF] px-1.5 py-0.5 rounded">
                      PPO
                    </span>
                  ) : opt?.academicSupportEligible ? (
                    <span className="text-[10px] font-mono font-medium text-[#0F9F6E] bg-[#ECFDF5] px-1.5 py-0.5 rounded">
                      ACADEMIC
                    </span>
                  ) : opt?.duration === "1D" ? (
                    <span className="text-[10px] font-mono font-medium text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                      ATTENDANCE
                    </span>
                  ) : null}
                </div>

                <div className="text-sm font-sans font-bold text-[#172033] mt-1">
                  {tier}
                </div>

                <div className="text-[10px] font-mono text-[#64748B] uppercase mt-0.5">
                  [{tag}]
                </div>

                {opt && (
                  <div className="mt-4 pt-2.5 border-t border-[#E2E8F0] space-y-1">
                    <div className="flex items-baseline justify-between text-xs text-[#64748B]">
                      <span>{opt.days === 1 ? "1 Session (2 hrs)" : `${opt.sessions || opt.labHours}+ Sessions`}</span>
                      {opt.discountPercent && (
                        <span className="font-mono text-[10px] font-bold text-[#0F9F6E] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                          {opt.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-between">
                      {opt.originalPriceINR && (
                        <span className="text-xs line-through text-red-500 font-medium">
                          {formatCurrency(opt.originalPriceINR)}
                        </span>
                      )}
                      <span className="text-base font-editorial font-bold text-orange-600">
                        {formatCurrency(opt.priceINR)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {isSelected && (
                <div className="mt-2.5 text-xs font-sans text-[#3157D5] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#3157D5]" />
                  <span>Selected Tier</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

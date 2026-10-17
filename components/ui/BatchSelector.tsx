"use client";

import React from "react";
import { Clock, CheckCircle } from "lucide-react";
import { useCourses } from "@/context/CourseContext";
import { BatchTiming, BatchTimingId } from "@/types";
import { cn } from "@/lib/utils";

interface BatchSelectorProps {
  selectedBatch: BatchTimingId;
  onSelectBatch: (id: BatchTimingId) => void;
  availableBatches?: BatchTimingId[];
  trackSlug?: string;
}

export function BatchSelector({
  selectedBatch,
  onSelectBatch,
  availableBatches = ["07:30_AM", "02:00_PM", "06:00_PM", "08:30_PM"],
  trackSlug,
}: BatchSelectorProps) {
  const { batches: managedBatches, isReady } = useCourses();

  const visibleBatches = React.useMemo(() => {
    if (isReady && managedBatches.length > 0) {
      const forTrack = trackSlug
        ? managedBatches.filter((b) => b.trackSlug === trackSlug && !b.archived)
        : [];
      if (forTrack.length > 0) {
        return forTrack.map((batch) => ({
          id: batch.timingId,
          timeLabel: batch.timeLabel,
          name: batch.name,
          status: batch.status,
          suitableFor: batch.suitableFor,
        }));
      }
      const distinct = new Map<string, BatchTiming>();
      managedBatches.forEach((b) => {
        if (!distinct.has(b.timingId)) {
          distinct.set(b.timingId, {
            id: b.timingId,
            timeLabel: b.timeLabel,
            name: b.name,
            status: b.status,
            suitableFor: b.suitableFor,
          });
        }
      });
      if (distinct.size > 0) return Array.from(distinct.values());
    }
    return [];
  }, [isReady, managedBatches, trackSlug]);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#172033] flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#3157D5]" />
          <span>Select Live Daily Cohort Timing</span>
        </label>
        <span className="text-xs font-sans text-[#0F9F6E] font-medium hidden sm:inline">
          Non-Conflicting Daily Engineering Sessions
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {visibleBatches.map((batch) => {
          const isAvailable = availableBatches.includes(batch.id) && batch.status !== "CLOSED";
          const isSelected = selectedBatch === batch.id;

          return (
            <button
              key={batch.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectBatch(batch.id)}
              className={cn(
                "p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between group",
                !isAvailable
                  ? "opacity-50 cursor-not-allowed bg-[#F8FAFC] border-[#E2E8F0]"
                  : isSelected
                  ? "bg-[#EEF4FF] border-[#3157D5] shadow-sm ring-1 ring-[#3157D5]"
                  : "bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] cursor-pointer shadow-soft"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#3157D5] font-semibold">
                    [{batch.id}]
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase font-semibold",
                      batch.status === "OPEN" ? "text-[#0F9F6E]" : "text-[#D97706]"
                    )}
                  >
                    {batch.status}
                  </span>
                </div>

                <div className="font-sans text-base font-bold text-[#172033]">
                  {batch.timeLabel}
                </div>
                <div className="text-xs text-[#64748B] font-medium uppercase mt-0.5">
                  {batch.name.replace("_", " ")}
                </div>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  {batch.suitableFor}
                </p>
              </div>

              {isSelected && (
                <div className="mt-3 pt-2.5 border-t border-[#D8E5FF] flex items-center gap-1.5 text-xs font-sans text-[#3157D5] font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3157D5]" />
                  <span>Selected Cohort Timing</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

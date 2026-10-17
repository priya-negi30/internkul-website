import React from "react";
import Link from "next/link";
import { Track, CohortDuration } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface TrackCardProps {
  track: Track;
  duration?: CohortDuration;
  showStarterOfferPricing?: boolean;
}

export function TrackCard({
  track,
  duration = "45D",
  showStarterOfferPricing = true,
}: TrackCardProps) {
  const currentDurationOption =
    track.durationOptions?.[duration] ||
    track.durationOptions?.["45D"] ||
    Object.values(track.durationOptions || {})[0];

  const starterOption = track.durationOptions?.["1D"];

  const displayedPrice =
    showStarterOfferPricing && starterOption
      ? starterOption.priceINR
      : currentDurationOption?.priceINR ?? 99;

  const displayedOriginalPrice =
    showStarterOfferPricing && starterOption
      ? starterOption.originalPriceINR
      : currentDurationOption?.originalPriceINR ?? 499;

  const displayedDiscount =
    showStarterOfferPricing && starterOption
      ? starterOption.discountPercent
      : currentDurationOption?.discountPercent ?? 80;

  const durationBadgeText =
    showStarterOfferPricing && starterOption
      ? `${starterOption.label} + Certification`
      : `[${currentDurationOption?.days ?? 45} Days]`;

  const pricingLabelText =
    showStarterOfferPricing && starterOption
      ? starterOption.tierName || "1-Day Certification"
      : "Tuition Fee";

  const nextBatchId = track.availableBatches?.[0]
    ? track.availableBatches[0].replace("_", " ")
    : "06:00 PM";

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 flex flex-col justify-between hover-card shadow-card group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <span className="text-xs font-sans font-semibold text-[#3157D5] uppercase tracking-wider">
            {track.domainLabel}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {currentDurationOption?.ppoEligible && (
              <span className="text-[10px] font-mono font-medium text-[#193B8F] bg-[#EEF4FF] px-2 py-0.5 rounded-full border border-[#D8E5FF]">
                PPO ELIGIBLE
              </span>
            )}
            <span className="font-mono text-[11px] sm:text-xs px-2.5 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569] font-medium whitespace-nowrap">
              {durationBadgeText}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-editorial text-xl font-bold text-[#172033] group-hover:text-[#3157D5] transition-colors leading-snug">
          <Link href={`/tracks/${track.slug}?duration=45D`}>
            {track.name}
          </Link>
        </h3>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 my-3.5">
          {track.primaryStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569]"
            >
              [{tech}]
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 mb-5 font-sans">
          {track.summary}
        </p>
      </div>

      <div>
        {/* Live Sessions Strip */}
        <div className="py-2.5 px-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1 mb-5">
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Live Sessions (Side-by-Side Practice)</span>
            <span className="text-[#172033] font-semibold">
              {(currentDurationOption?.sessions || currentDurationOption?.labHours || 45)}+ Sessions
            </span>
          </div>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Next Live Cohort</span>
            <span className="text-[#0F9F6E] font-mono font-medium">
              [LIVE • {nextBatchId}]
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-sans text-[#64748B] tracking-wider font-semibold">
                {pricingLabelText}
              </span>
              {displayedDiscount > 0 && (
                <span className="font-mono text-[10px] font-bold text-[#0F9F6E] bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]">
                  {displayedDiscount}% OFF
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-editorial font-bold text-orange-600">
                {formatCurrency(displayedPrice)}
              </span>
              {displayedOriginalPrice > displayedPrice && (
                <span className="text-xs line-through text-red-500 font-medium">
                  {formatCurrency(displayedOriginalPrice)}
                </span>
              )}
            </div>
            {showStarterOfferPricing && (
              <div className="mt-1 text-xs text-[#64748B] font-sans flex items-center gap-1">
                <span>45-Days Cohort:</span>
                <Link
                  href={`/tracks/${track.slug}?duration=45D`}
                  className="text-[#334155] hover:text-[#172033] underline underline-offset-2 font-medium transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            )}
          </div>

          <Link
            href={`/tracks/${track.slug}?duration=45D`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3157D5] text-white text-xs font-sans font-semibold hover:bg-[#193B8F] shadow-sm transition-all shrink-0"
          >
            <span>View Course</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

interface StatusPillProps {
  status: "OPEN" | "FILLING_FAST" | "CLOSED" | "VERIFIED" | "LOR_ELIGIBLE" | "PPO_ELIGIBLE" | "IN_PROGRESS" | "REVOKED";
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = {
    OPEN: {
      label: "BATCH: OPEN",
      dot: "bg-[#0F9F6E]",
      text: "text-[#0F9F6E]",
      border: "border-[#A7F3D0]",
      bg: "bg-[#ECFDF5]",
    },
    FILLING_FAST: {
      label: "CLOSING SOON",
      dot: "bg-[#D97706]",
      text: "text-[#D97706]",
      border: "border-[#FDE68A]",
      bg: "bg-[#FEF3C7]",
    },
    CLOSED: {
      label: "BATCH CLOSED",
      dot: "bg-[#94A3B8]",
      text: "text-[#64748B]",
      border: "border-[#E2E8F0]",
      bg: "bg-[#F1F5F9]",
    },
    VERIFIED: {
      label: "CREDENTIAL: VERIFIED",
      dot: "bg-[#0F9F6E]",
      text: "text-[#0F9F6E]",
      border: "border-[#A7F3D0]",
      bg: "bg-[#ECFDF5]",
    },
    LOR_ELIGIBLE: {
      label: "TOP 40% LOR",
      dot: "bg-[#0F9F6E]",
      text: "text-[#0F9F6E]",
      border: "border-[#A7F3D0]",
      bg: "bg-[#ECFDF5]",
    },
    PPO_ELIGIBLE: {
      label: "PPO ELIGIBLE",
      dot: "bg-[#3157D5]",
      text: "text-[#3157D5]",
      border: "border-[#D8E5FF]",
      bg: "bg-[#EEF4FF]",
    },
    IN_PROGRESS: {
      label: "IN PROGRESS",
      dot: "bg-[#3157D5]",
      text: "text-[#3157D5]",
      border: "border-[#D8E5FF]",
      bg: "bg-[#EEF4FF]",
    },
    REVOKED: {
      label: "REVOKED",
      dot: "bg-[#E11D48]",
      text: "text-[#E11D48]",
      border: "border-[#FECDD3]",
      bg: "bg-[#FFF1F2]",
    },
  }[status] || {
    label: "STATUS: VERIFIED",
    dot: "bg-[#0F9F6E]",
    text: "text-[#0F9F6E]",
    border: "border-[#A7F3D0]",
    bg: "bg-[#ECFDF5]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border font-medium",
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
      {config.label}
    </span>
  );
}

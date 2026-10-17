import React from "react";
import { cn } from "@/lib/utils";

interface TerminalLabelProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "verified" | "warning";
  className?: string;
}

export function TerminalLabel({
  children,
  variant = "default",
  className,
}: TerminalLabelProps) {
  const variantStyles = {
    default: "bg-[#F1F5F9] border-[#E2E8F0] text-[#475569]",
    accent: "bg-[#EEF4FF] border-[#D8E5FF] text-[#3157D5]",
    verified: "bg-[#ECFDF5] border-[#A7F3D0] text-[#0F9F6E]",
    warning: "bg-[#FEF3C7] border-[#FDE68A] text-[#D97706]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium tracking-wide border uppercase",
        variantStyles[variant],
        className
      )}
    >
      [{children}]
    </span>
  );
}

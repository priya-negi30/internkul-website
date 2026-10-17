"use client";

import Link from "next/link";
import { ReactNode } from "react";

export function AdminPageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#3157D5] mb-1.5">
            {eyebrow}
          </p>
        )}
        <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#172033]">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-2xl leading-relaxed font-sans">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function AdminButton({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-sans font-semibold transition-all ${
        secondary
          ? "border border-[#CBD5E1] bg-white text-[#172033] hover:border-[#3157D5] hover:text-[#3157D5] hover:bg-[#F8FAFC] shadow-soft"
          : "bg-[#3157D5] text-white hover:bg-[#193B8F] shadow-sm hover:shadow"
      }`}
    >
      {children}
    </Link>
  );
}

export function AdminPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-[#E2E8F0] bg-white shadow-card ${className}`}>
      {children}
    </section>
  );
}

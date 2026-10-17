"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, ArrowRight, GraduationCap, LogOut, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tracks", label: "Courses" },
  { href: "/internship-matrix", label: "Training & Internship" },
  { href: "/verify", label: "Verify" },
  { href: "/colleges", label: "For Colleges" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { student, user, isLoggedIn, logout } = useAuth();

  const isAdmin = isLoggedIn && user?.role === "admin";
  const isStudent = isLoggedIn && !isAdmin;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3.5">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3157D5] to-[#193B8F] flex items-center justify-center text-white shadow-sm group-hover:shadow transition-shadow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#172033] flex items-center gap-1.5 leading-none">
                  internkul
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-medium mt-0.5">
                  Live Technical Education
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-1.5 text-sm font-sans font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-[#3157D5] bg-[#EEF4FF]"
                        : "text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs font-sans font-semibold text-[#193B8F] hover:bg-[#D8E5FF] shadow-sm transition-all"
                  title="Open Admin Dashboard"
                >
                  <span className="w-6 h-6 rounded-lg bg-[#3157D5] text-white flex items-center justify-center text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>Admin Dashboard</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : isStudent ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-xs font-sans font-semibold text-[#193B8F] hover:bg-[#D8E5FF] shadow-sm transition-all"
                  title="View Student Profile"
                >
                  <span className="w-6 h-6 rounded-lg bg-[#3157D5] text-white flex items-center justify-center text-[11px] font-bold">
                    {student?.firstName ? student.firstName[0] : (user?.name ? user.name[0] : "S")}
                  </span>
                  <span>{student?.fullName || user?.name || "Student Profile"}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-xl bg-white border border-[#E2E8F0] text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-sans font-semibold text-[#172033] hover:text-[#3157D5] hover:border-[#3157D5] hover:bg-[#F8FAFC] shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4 text-[#3157D5]" />
                <span>Login</span>
              </Link>
            )}

            <Link
              href="/tracks"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3157D5] text-white text-xs font-sans font-semibold hover:bg-[#193B8F] shadow-sm hover:shadow transition-all"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {isAdmin ? (
              <Link
                href="/admin"
                className="w-9 h-9 rounded-lg bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center font-bold text-xs"
                aria-label="Admin Dashboard"
                title="Admin Dashboard"
              >
                <ShieldCheck className="w-4 h-4 text-[#3157D5]" />
              </Link>
            ) : isStudent ? (
              <Link
                href="/profile"
                className="w-9 h-9 rounded-lg bg-[#EEF4FF] border border-[#D8E5FF] text-[#3157D5] flex items-center justify-center font-bold text-xs"
                aria-label="Student Profile"
                title="Student Profile"
              >
                {student?.firstName ? student.firstName[0] : (user?.name ? user.name[0] : "S")}
              </Link>
            ) : (
              <Link
                href="/login"
                className="p-2 rounded-lg border border-[#E2E8F0] text-[#172033] bg-white"
                aria-label="Login"
                title="Login"
              >
                <LogIn className="w-4 h-4 text-[#3157D5]" />
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[#E2E8F0] text-[#475569] bg-white hover:bg-[#F8FAFC]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3.5 py-2.5 text-sm font-sans font-medium rounded-lg flex items-center justify-between",
                    isActive
                      ? "text-[#3157D5] bg-[#EEF4FF]"
                      : "text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC]"
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs font-mono text-[#3157D5] font-semibold">[ACTIVE]</span>}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <Link
              href="/tracks"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-xl bg-[#3157D5] text-white text-xs font-sans font-semibold"
            >
              Explore Courses →
            </Link>

            {isAdmin ? (
              <div className="space-y-2">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 text-center rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F] text-xs font-sans font-semibold flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#3157D5]" />
                  <span>Admin Dashboard →</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 text-center rounded-xl bg-white border border-[#E2E8F0] text-rose-600 text-xs font-sans font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : isStudent ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 text-center rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] text-[#193B8F] text-xs font-sans font-semibold block"
                >
                  My Profile ({student?.fullName || user?.name || "Student"}) →
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-4 text-center rounded-xl bg-white border border-[#E2E8F0] text-rose-600 text-xs font-sans font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 text-center rounded-xl bg-white border border-[#CBD5E1] text-[#172033] text-xs font-sans font-semibold flex items-center justify-center gap-1.5 shadow-soft"
              >
                <LogIn className="w-4 h-4 text-[#3157D5]" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

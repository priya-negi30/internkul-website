"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Award,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses & Tracks", icon: BookOpen },
  { href: "/admin/batches", label: "Batches & Timings", icon: CalendarDays },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/credentials", label: "Credentials", icon: Award },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/login?next=" + encodeURIComponent(pathname));
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading || !user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 sm:p-10">
        <div className="max-w-5xl mx-auto animate-pulse space-y-6">
          <div className="h-10 w-64 rounded-xl bg-slate-200/80" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="h-28 rounded-2xl bg-white border border-[#E2E8F0]" />
            <div className="h-28 rounded-2xl bg-white border border-[#E2E8F0]" />
            <div className="h-28 rounded-2xl bg-white border border-[#E2E8F0]" />
          </div>
          <div className="h-72 rounded-2xl bg-white border border-[#E2E8F0]" />
        </div>
      </div>
    );
  }

  const sidebar = (
    <aside
      className={`${
        collapsed ? "w-[76px]" : "w-64"
      } ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } fixed z-40 inset-y-0 left-0 transition-all duration-200 border-r border-[#E2E8F0] bg-white flex flex-col shadow-sm`}
    >
      {/* Brand Header */}
      <div className="h-18 sm:h-20 px-4 sm:px-5 flex items-center justify-between border-b border-[#E2E8F0]">
        <Link href="/admin" className="flex items-center gap-3 overflow-hidden group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-br from-[#3157D5] to-[#193B8F] text-white flex items-center justify-center shadow-sm">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-editorial text-xl font-bold tracking-tight text-[#172033] flex items-center gap-1 leading-none">
                internkul
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-semibold mt-0.5">
                ADMIN CONSOLE
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans transition-all ${
                active
                  ? "bg-[#EEF4FF] text-[#3157D5] font-semibold border border-[#D8E5FF] shadow-soft"
                  : "text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC] border border-transparent font-medium"
              } ${collapsed ? "justify-center px-2" : ""}`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Return Link */}
      <div className="p-3 border-t border-[#E2E8F0]">
        <Link
          href="/"
          className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans font-medium text-[#64748B] hover:text-[#3157D5] hover:bg-[#EEF4FF] transition-colors ${
            collapsed ? "justify-center px-2" : ""
          }`}
          title={collapsed ? "Back to main site" : undefined}
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Back to main site</span>}
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] font-sans">
      {sidebar}

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className={`${collapsed ? "md:pl-[76px]" : "md:pl-64"} transition-[padding] flex flex-col min-h-screen`}>
        {/* Top Header */}
        <header className="h-18 sm:h-20 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-soft">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="font-editorial text-lg sm:text-xl font-bold text-[#172033] leading-tight">
                Admin Workspace
              </p>
              <p className="text-xs text-[#64748B] hidden sm:block">
                Manage your industrial training and learning catalog
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs sm:text-sm font-semibold text-[#172033]">{user.name}</p>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-[#0F9F6E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F9F6E]" />
                Administrator
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] border border-[#D8E5FF] flex items-center justify-center text-[#3157D5] font-bold text-xs shadow-soft">
              <Users className="w-4 h-4 text-[#3157D5]" />
            </div>
            <button
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-sans font-semibold text-[#64748B] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 shadow-soft transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 max-w-[1600px] w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

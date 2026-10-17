"use client";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  return <>{!isAdmin && <SiteHeader />}<main className="flex-1 w-full">{children}</main>{!isAdmin && <SiteFooter />}</>;
}

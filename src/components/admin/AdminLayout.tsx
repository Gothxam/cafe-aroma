"use client";

import Link from "next/link";
import { LayoutDashboard, Utensils, CalendarDays, BookOpen, LogOut, Coffee, Image as ImageIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogoutButton from "./LogoutButton";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fafaf9] text-gray-900 isolation isolate">
      <Toaster position="top-right" richColors />
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] border-r border-white/5 p-8 hidden lg:flex flex-col z-50">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20">
            <Coffee className="h-5 w-5 text-[#d4af37]" />
          </div>
          <div>
            <span className="text-lg font-black text-white tracking-tight block leading-none">AROMA</span>
            <span className="text-[10px] font-black text-[#d4af37] tracking-[0.2em] uppercase">Control Center</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <AdminNavLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <AdminNavLink href="/admin/menu" icon={Utensils} label="Menu Catalog" />
          <AdminNavLink href="/admin/gallery" icon={ImageIcon} label="Gallery Post" />
          <AdminNavLink href="/admin/events" icon={CalendarDays} label="Events" />
          <AdminNavLink href="/admin/reservations" icon={BookOpen} label="Reservations" />
        </nav>

        <div className="pt-8 border-t border-white/5">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 px-5 py-4 text-xs font-black uppercase tracking-widest transition-all rounded-2xl group",
        isActive
          ? "bg-[#d4af37] text-black shadow-xl shadow-black/20"
          : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-black" : "text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors")} />
      {label}
    </Link>
  );
}

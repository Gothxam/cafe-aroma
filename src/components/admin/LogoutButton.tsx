"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-4 text-xs font-black text-white/40 hover:text-white hover:bg-white/5 rounded-2xl transition-all uppercase tracking-widest"
        >
            <LogOut className="w-4 h-4" />
            Exit Portal
        </button>
    );
}

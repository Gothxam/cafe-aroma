"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Lock, Mail, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] selection:bg-[#d4af37] selection:text-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
            <Coffee className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black text-[#fdfaf7] tracking-tighter uppercase">
            Admin <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Portal.</span>
          </h1>
          <p className="mt-4 text-[#fdfaf7]/40 font-medium">Verify your credentials to manage the sanctuary.</p>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-[#111] p-10 shadow-3xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#d4af37] tracking-[0.3em] uppercase ml-4">Username</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#fdfaf7]/20" />
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  type="text"
                  required
                  className="bg-black/50 border-white/5 rounded-2xl pl-14 h-14 text-[#fdfaf7] placeholder:text-white/10 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#d4af37] tracking-[0.3em] uppercase ml-4">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#fdfaf7]/20" />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  required
                  className="bg-black/50 border-white/5 rounded-2xl pl-14 h-14 text-[#fdfaf7] placeholder:text-white/10 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl bg-red-500/10 p-4 text-xs font-bold text-red-500 border border-red-500/20"
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </motion.div>
            )}

            <Button
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-[#d4af37] hover:bg-[#b8962d] text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all active:scale-95"
            >
              {loading ? "Verifying..." : "Authorize Access"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

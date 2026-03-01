"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { motion } from "framer-motion";
import {
    Users,
    ShoppingBag,
    Calendar,
    TrendingUp,
    Coffee,
    Clock,
    ArrowUpRight,
    Loader2
} from "lucide-react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/stats");
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <AdminLayout>
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl font-black text-[#0a0a0a] tracking-tight uppercase">Dashboard</h1>
                    <p className="text-gray-500 font-medium">Welcome back, Captain. Here's what's happening at the sanctuary.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Sanctuary Items"
                        value={loading ? "..." : stats?.menu || 0}
                        trend="Live"
                        icon={Coffee}
                    />
                    <StatCard
                        title="Scheduled Events"
                        value={loading ? "..." : stats?.events || 0}
                        trend="Upcoming"
                        icon={Calendar}
                        delayed
                    />
                    <StatCard
                        title="Total Registry"
                        value={loading ? "..." : stats?.reservations || 0}
                        trend="Guest List"
                        icon={Users}
                    />
                    <StatCard
                        title="Pending Requests"
                        value={loading ? "..." : stats?.pending || 0}
                        trend="Action Needed"
                        icon={TrendingUp}
                        delayed
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black uppercase tracking-tight">Recent Activity</h2>
                            <button className="text-xs font-bold text-[#d4af37] uppercase tracking-widest flex items-center gap-2">
                                View All <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <ActivityItem
                                title="New Event Added"
                                desc="Jazz Night under the stars has been scheduled for Friday."
                                time="2 hours ago"
                                type="event"
                            />
                            <ActivityItem
                                title="New Reservation"
                                desc="Table for 4 confirmed for Friday at 8:00 PM."
                                time="4 hours ago"
                                type="reservation"
                            />
                            <ActivityItem
                                title="Menu Updated"
                                desc="Artisan Pastry collection added 3 new seasonal items."
                                time="Yesterday"
                                type="menu"
                            />
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] rounded-[2.5rem] p-8 text-white">
                        <h2 className="text-xl font-black uppercase tracking-tight mb-8">System Health</h2>
                        <div className="space-y-8">
                            <HealthFactor label="Server Performance" value={98} />
                            <HealthFactor label="Database Uptime" value={100} />
                            <HealthFactor label="SEO Visibility" value={84} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, trend, icon: Icon, delayed }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delayed ? 0.2 : 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:border-[#d4af37]/30 transition-all"
        >
            <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-2xl bg-[#fafaf9] group-hover:bg-[#d4af37]/10 transition-colors">
                    <Icon className="w-6 h-6 text-[#d4af37]" />
                </div>
                <span className="text-xs font-black text-green-500">{trend}</span>
            </div>
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-1">{title}</h3>
            <p className="text-3xl font-black tracking-tighter text-[#0a0a0a]">{value}</p>
        </motion.div>
    );
}

function ActivityItem({ title, desc, time, type }: any) {
    return (
        <div className="flex gap-6 items-start">
            <div className="h-10 w-10 shrink-0 rounded-2xl bg-[#fafaf9] flex items-center justify-center text-xs font-black">
                {type[0].toUpperCase()}
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h4 className="font-bold text-sm tracking-tight">{title}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{time}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-snug">{desc}</p>
            </div>
        </div>
    );
}

function HealthFactor({ label, value }: { label: string, value: number }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</span>
                <span className="text-xs font-black text-[#d4af37]">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[#d4af37]"
                />
            </div>
        </div>
    );
}

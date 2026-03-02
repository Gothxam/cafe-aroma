"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ReservationTable from "@/components/admin/ReservationTable";
import { BookOpen, RefreshCw, Calendar as CalendarIcon, X, Clock, CheckCircle2, XCircle, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReservationsPage() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reservations`);
            if (response.ok) {
                const data = await response.json();
                setReservations(data);
            }
        } catch (error) {
            console.error("Failed to fetch reservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const filteredReservations = reservations.filter((res: any) => {
        const matchesDate = !filterDate || res.date === filterDate;
        const matchesStatus = statusFilter === "all" || res.status === statusFilter;
        return matchesDate && matchesStatus;
    });

    const pendingCount = reservations.filter((res: any) => res.status === "pending").length;

    return (
        <AdminLayout>
            <div className="space-y-10">
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase">
                            <BookOpen className="w-3 h-3" />
                            Guest List
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.8]">
                            Reservations <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal text-4xl">Management.</span>
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative group">
                            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" />
                            <Input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="pl-12 pr-10 h-14 w-[240px] rounded-2xl border-gray-100 bg-white focus:ring-[#d4af37]/20 focus:border-[#d4af37] font-bold text-sm"
                            />
                            {filterDate && (
                                <button
                                    onClick={() => setFilterDate("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-3 h-3 text-gray-400" />
                                </button>
                            )}
                        </div>

                        <Button
                            onClick={fetchReservations}
                            variant="outline"
                            className="h-14 px-8 rounded-2xl border-gray-100 bg-white font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-fit">
                        <TabsList className="bg-white border border-gray-100 p-1 rounded-2xl h-14">
                            <TabsTrigger value="all" className="px-6 rounded-xl data-[state=active]:bg-[#0a0a0a] data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">
                                <ListFilter className="w-3 h-3 mr-2" />
                                All Registry
                            </TabsTrigger>
                            <TabsTrigger value="pending" className="px-6 rounded-xl data-[state=active]:bg-amber-500 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest relative">
                                <Clock className="w-3 h-3 mr-2" />
                                Pending
                                {pendingCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-[#fafaf9]">
                                        {pendingCount}
                                    </span>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="confirmed" className="px-6 rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">
                                <CheckCircle2 className="w-3 h-3 mr-2" />
                                Confirmed
                            </TabsTrigger>
                            <TabsTrigger value="cancelled" className="px-6 rounded-xl data-[state=active]:bg-red-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">
                                <XCircle className="w-3 h-3 mr-2" />
                                Rejected
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        Showing <span className="text-gray-900">{filteredReservations.length}</span> of <span className="text-gray-900">{reservations.length}</span> entries
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-2 shadow-sm relative overflow-hidden">
                    {loading && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <RefreshCw className="w-8 h-8 text-[#d4af37] animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Updating Registry...</span>
                            </div>
                        </div>
                    )}
                    <ReservationTable reservations={filteredReservations} onUpdate={fetchReservations} />
                </div>
            </div>
        </AdminLayout>
    );
}

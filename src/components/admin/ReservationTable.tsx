"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Check, X, Clock, User, Phone, Mail, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Reservation {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    date: string;
    time: string;
    guests: number;
    preferences?: string;
    status: "pending" | "confirmed" | "cancelled";
}

export default function ReservationTable({ reservations, onUpdate }: { reservations: Reservation[], onUpdate: () => void }) {
    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reservations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                toast.success(`Reservation ${status === "confirmed" ? "Accepted" : "Rejected"}`);
                onUpdate();
            }
        } catch (error) {
            toast.error("A nexus error occurred during transmission.");
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm min-h-[400px]">
            <Table>
                <TableHeader className="bg-[#fafaf9]">
                    <TableRow className="border-gray-100">
                        <TableHead className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Guest</TableHead>
                        <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</TableHead>
                        <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Guests</TableHead>
                        <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</TableHead>
                        <TableHead className="py-6 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations.length > 0 ? (
                        reservations.map((res) => (
                            <TableRow key={res._id} className="border-gray-100 hover:bg-[#fafaf9] transition-colors group">
                                <TableCell className="py-6 px-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#fafaf9] flex items-center justify-center text-[#d4af37] shrink-0">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 tracking-tight leading-none mb-1">{res.name}</p>
                                            <p className="text-[10px] font-medium text-gray-400 truncate max-w-[200px]">{res.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">{res.date}</span>
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{res.time}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-[10px] font-black text-gray-900">
                                        {res.guests}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full ${res.status === "confirmed" ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                                            res.status === "cancelled" ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                                'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                            }`} />
                                        <span className={`text-[10px] font-black uppercase ${res.status === "confirmed" ? 'text-green-600' :
                                            res.status === "cancelled" ? 'text-red-600' :
                                                'text-amber-600'
                                            }`}>
                                            {res.status}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 px-8 text-right">
                                    {res.status === "pending" ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => updateStatus(res._id, "confirmed")}
                                                className="p-2 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all"
                                                title="Confirm"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(res._id, "cancelled")}
                                                className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all"
                                                title="Reject"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Decision Made</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="py-20 text-center">
                                <p className="text-gray-400 font-medium italic tracking-tight">The guest list is currently empty.</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

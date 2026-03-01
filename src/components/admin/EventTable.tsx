"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit2, Trash2, CalendarDays, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EventTable() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`}/api/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this gathering?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Event removed from the calendar.");
        fetchEvents();
      } else {
        toast.error("Failed to cancel event.");
      }
    } catch (error) {
      toast.error("A nexus error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-[2.5rem] border border-gray-100 min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Aligning the calendar...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm min-h-[400px]">
      <Table>
        <TableHeader className="bg-[#fafaf9]">
          <TableRow className="border-gray-100">
            <TableHead className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event</TableHead>
            <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule</TableHead>
            <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</TableHead>
            <TableHead className="py-6 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <EventRow
                key={event._id}
                event={event}
                onDelete={() => handleDelete(event._id)}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-20 text-center">
                <p className="text-gray-400 font-medium italic tracking-tight">The calendar is currently clear.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function EventRow({ event, onDelete }: any) {
  return (
    <TableRow className="border-gray-100 hover:bg-[#fafaf9] transition-colors group">
      <TableCell className="py-6 px-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] overflow-hidden">
            {event.image ? (
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <CalendarDays className="w-5 h-5" />
            )}
          </div>
          <span className="font-bold text-gray-900 tracking-tight">{event.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">{event.date}</span>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{event.time}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${event.active !== false ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-gray-300'}`} />
          <span className={`text-[10px] font-black uppercase ${event.active !== false ? 'text-blue-600' : 'text-gray-400'}`}>
            {event.active !== false ? 'Upcoming' : 'Past'}
          </span>
        </div>
      </TableCell>
      <TableCell className="py-6 px-8 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 hover:bg-[#d4af37]/10 text-gray-400 hover:text-[#d4af37] rounded-lg transition-all">
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}

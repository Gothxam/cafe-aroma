"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import EventForm from "@/components/admin/EventForm";
import EventTable from "@/components/admin/EventTable";
import { Sparkles } from "lucide-react";

export default function AdminEventsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] text-[10px] font-black tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3" />
            Social Manuscripts
          </div>
          <h1 className="text-4xl font-black text-[#0a0a0a] tracking-tight uppercase">Events Management</h1>
          <p className="text-gray-500 font-medium">Coordinate the rhythmic gatherings of the sanctuary.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="xl:col-span-1">
            <EventForm onSuccess={handleRefresh} />
          </div>
          <div className="xl:col-span-2">
            <EventTable key={refreshKey} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

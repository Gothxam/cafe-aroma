"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Clock, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EventForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    image: null as File | null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error("An event visual is required for the collection.");
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("time", formData.time);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/events`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success("Event scheduled successfully!");
        setFormData({ title: "", date: "", time: "", description: "", image: null });
        setImagePreview(null);
        if (onSuccess) onSuccess();
      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to schedule event");
      }
    } catch (error) {
      toast.error("A nexus error occurred during transmission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm h-fit">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-[#fafaf9] text-[#d4af37]">
          <Calendar className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tight">Schedule Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Event Visual</label>
          <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-gray-100 hover:border-[#d4af37]/30 transition-all aspect-video bg-[#fafaf9] flex items-center justify-center cursor-pointer">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Banner</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Event Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Midnight Jazz Sessions"
            className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium px-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Date</label>
            <div className="relative">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium pl-14 pr-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Time</label>
            <div className="relative">
              <Clock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium pl-14 pr-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Craft the narrative for this gathering..."
            className="w-full bg-[#fafaf9] border-gray-100 rounded-2xl min-h-[120px] font-medium p-6 text-sm focus:border-[#d4af37]/30 outline-none transition-all resize-none"
            required
          />
        </div>

        <Button
          disabled={loading}
          className="w-full h-16 rounded-2xl bg-[#0a0a0a] hover:bg-[#d4af37] text-white hover:text-black font-black uppercase tracking-[0.1em] text-[10px] shadow-2xl transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          Publish Event
        </Button>
      </form>
    </div>
  );
}

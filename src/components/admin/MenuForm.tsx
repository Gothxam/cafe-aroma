"use client";

import { useState } from "react";
import { Plus, Utensils, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MenuForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Coffee",
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
      toast.error("An artisan visual is required for the collection.");
      return;
    }
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("image", formData.image);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`}/api/menu`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        toast.success("Dish added to catalog successfully!");
        setFormData({ name: "", price: "", category: "Coffee", description: "", image: null });
        setImagePreview(null);
        if (onSuccess) onSuccess();
      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to add dish");
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
          <Utensils className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tight">Add Dish</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Area */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Artisan Visual</label>
          <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-gray-100 hover:border-[#d4af37]/30 transition-all aspect-video bg-[#fafaf9] flex items-center justify-center cursor-pointer">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Image</span>
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
          <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Dish Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ethiopian Yirgacheffe"
            className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium px-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Price</label>
            <Input
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="$ 0.00"
              className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium px-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium px-6 text-sm focus:border-[#d4af37]/30 outline-none transition-all appearance-none cursor-pointer"
            >
              <option>Coffee</option>
              <option>Pastry</option>
              <option>Brew</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the flavor profile..."
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
          Add to Catalog
        </Button>
      </form>
    </div>
  );
}

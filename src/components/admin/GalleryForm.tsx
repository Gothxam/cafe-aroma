"use client";

import { motion } from "framer-motion";
import { Upload, X, Check, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function GalleryForm({ onSuccess }: { onSuccess?: () => void }) {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        image: null as File | null,
    });

    const handleFileChange = (file: File) => {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error("Please select an artisan visual first");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("subtitle", formData.subtitle);
            data.append("image", formData.image);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery`, {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                toast.success("Visual added to gallery!");
                setFormData({ title: "", subtitle: "", image: null });
                setPreview(null);
                if (onSuccess) onSuccess();
            } else {
                const err = await response.json();
                toast.error(err.message || "Failed to upload visual");
            }
        } catch (err) {
            toast.error("A nexus error occurred during development.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm h-fit">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8">Add New Visual</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileChange(file);
                    }}
                    className={`relative aspect-square rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all ${dragActive ? "border-[#d4af37] bg-[#d4af37]/5" : "border-gray-100 bg-[#fafaf9]"
                        }`}
                >
                    {preview ? (
                        <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => { setPreview(null); setFormData({ ...formData, image: null }); }}
                                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center p-6 space-y-4">
                            <div className="mx-auto w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                                <Upload className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 leading-none mb-2">Drop your image here</p>
                                <p className="text-xs text-gray-400 font-medium tracking-tight">Support JPG, PNG, WEBP (Max 5MB)</p>
                            </div>
                            <div className="relative">
                                <Button type="button" variant="outline" className="h-10 px-6 rounded-xl border-gray-100 font-black uppercase text-[10px] tracking-widest transition-all hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37]">
                                    Browse Files
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileChange(file);
                                    }}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Title</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. The Rhythmic Pour"
                            className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium px-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase ml-4">Subtitle</label>
                        <Input
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            placeholder="e.g. The Collection"
                            className="bg-[#fafaf9] border-gray-100 rounded-2xl h-14 font-medium px-6 focus:border-[#d4af37]/30 focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
                            required
                        />
                    </div>
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
                    Add to Collection
                </Button>
            </form>
        </div>
    );
}

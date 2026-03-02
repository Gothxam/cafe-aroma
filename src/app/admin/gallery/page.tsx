"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import GalleryForm from "@/components/admin/GalleryForm";
import { Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminGalleryPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const fetchGallery = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery`);
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, [refreshKey]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this visual from the scroll?")) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/gallery/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                toast.success("Visual removed from gallery.");
                setRefreshKey(prev => prev + 1);
            } else {
                toast.error("Failed to remove visual.");
            }
        } catch (error) {
            toast.error("A nexus error occurred.");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] text-[10px] font-black tracking-[0.2em] uppercase">
                            <Sparkles className="w-3 h-3" />
                            Visual Assets
                        </div>
                        <h1 className="text-4xl font-black text-[#0a0a0a] tracking-tight uppercase">Gallery Management</h1>
                        <p className="text-gray-500 font-medium">Curate the cinematic experience for your visitors.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    <div className="xl:col-span-1">
                        <GalleryForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
                    </div>

                    <div className="xl:col-span-2 space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Current Collection</h2>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
                                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Developing the film...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <GalleryItemCard
                                            key={item._id}
                                            item={item}
                                            onDelete={() => handleDelete(item._id)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                                        <p className="text-gray-400 font-medium italic">The collection is currently empty.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function GalleryItemCard({ item, onDelete }: any) {
    return (
        <div className="group relative aspect-video rounded-[2rem] overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white font-black text-sm tracking-tight mb-1">{item.title}</p>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">
                        {item.active !== false ? 'Active in Scroll' : 'Hidden'}
                    </span>
                    <button
                        onClick={onDelete}
                        className="text-[10px] font-black text-white hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

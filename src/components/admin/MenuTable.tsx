"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MenuTable() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/menu");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch culinary catalog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this masterpiece from the catalog?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/menu/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        toast.success("Item removed from catalog.");
        fetchItems();
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      toast.error("A nexus error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-[2.5rem] border border-gray-100 min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Aligning the menu...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm min-h-[400px]">
      <Table>
        <TableHeader className="bg-[#fafaf9]">
          <TableRow className="border-gray-100">
            <TableHead className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Item</TableHead>
            <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</TableHead>
            <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</TableHead>
            <TableHead className="py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</TableHead>
            <TableHead className="py-6 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <MenuRow
                key={item._id}
                item={item}
                onDelete={() => handleDelete(item._id)}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="py-20 text-center">
                <p className="text-gray-400 font-medium italic tracking-tight">The catalog is currently empty.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function MenuRow({ item, onDelete }: any) {
  return (
    <TableRow className="border-gray-100 hover:bg-[#fafaf9] transition-colors group">
      <TableCell className="py-6 px-8">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#0a0a0a]/5 flex items-center justify-center text-[10px] font-black text-gray-300">
                <ImageIcon className="w-4 h-4" />
              </div>
            )}
          </div>
          <span className="font-bold text-gray-900 tracking-tight">{item.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter">{item.category}</span>
      </TableCell>
      <TableCell>
        <span className="font-bold text-gray-900">${Number(item.price).toFixed(2)}</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${item.active !== false ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'}`} />
          <span className={`text-[10px] font-black uppercase ${item.active !== false ? 'text-green-600' : 'text-gray-400'}`}>
            {item.active !== false ? 'Live' : 'Hidden'}
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

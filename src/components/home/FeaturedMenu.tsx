"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Coffee, ChevronRight, Sparkles, Star, Utensils, Zap } from "lucide-react";

const staticItems = [
  {
    name: "Signature Cappuccino",
    description: "Triple-origin espresso with velvety microfoam and a hint of Madagascar vanilla.",
    price: "₹180",
    category: "Specialty Brew",
    icon: Coffee
  },
  {
    name: "Creamy Pasta Alfredo",
    description: "Handmade fettuccine in our secret parmesan cream, finished with white truffle oil.",
    price: "₹320",
    category: "Signature Main",
    icon: Utensils
  },
  {
    name: "Artisan Grilled Croissant",
    description: "Flaky, buttery layers with melted gruyère and sun-dried tomato aioli.",
    price: "₹220",
    category: "Savory Plate",
    icon: Zap
  },
  {
    name: "Midnight Chocolate Silk",
    description: "70% dark cocoa ganache on a sea-salt crust with gold-leaf finish.",
    price: "₹150",
    category: "Dessert Art",
    icon: Star
  },
];

export default function FeaturedMenu() {
  const [items, setItems] = useState<any[]>(staticItems);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setItems(data.slice(0, 4)); // Only show top 4 featured
          }
        }
      } catch (error) {
        console.log("Using static menu data");
      }
    };
    fetchMenu();
  }, []);
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase">
              <Sparkles className="w-3 h-3" />
              The Curator's Choice
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#fdfaf7] tracking-tighter leading-none mb-6">
              SIGNATURE <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Selections.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="ghost" className="text-[#fdfaf7]/40 hover:text-[#d4af37] font-black uppercase tracking-widest text-xs p-0 h-auto hover:bg-transparent group">
              <Link href="/menu" className="flex items-center gap-3">
                View Full Manuscript
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Cinematic Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon || Utensils;
            return (
              <motion.div
                key={item.id || item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative h-full bg-[#1a1a1a] border border-white/5 p-8 rounded-[2.5rem] hover:border-[#d4af37]/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                  {item.image && (
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all duration-500">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/30">{item.category}</span>
                  </div>

                  <h3 className="relative z-10 text-2xl font-black text-[#fdfaf7] mb-3 tracking-tight group-hover:text-[#d4af37] transition-colors">{item.name}</h3>
                  <p className="relative z-10 text-sm font-medium text-[#fdfaf7]/40 leading-relaxed mb-8 h-20 overflow-hidden line-clamp-3">{item.description}</p>

                  <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5 bg-[#1a1a1a]/80 backdrop-blur-sm -mx-8 px-8 -mb-8 pb-8">
                    <span className="text-2xl font-black text-[#fdfaf7]">
                      {typeof item.price === "number" ? `₹${item.price}` : item.price}
                    </span>
                    <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#fdfaf7] group-hover:text-black transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

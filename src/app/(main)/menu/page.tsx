"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Coffee, Utensils, Pizza, IceCream, ChevronRight, Sparkles, Loader2 } from "lucide-react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data);
        }
      } catch (error) {
        console.error("Failed to fetch menu");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Organize flat data into category groups
  const groupByCategory = (items: any[]) => {
    const categories: any[] = [];
    const groups = items.reduce((acc, item) => {
      const category = item.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as any);

    Object.keys(groups).forEach(catTitle => {
      categories.push({
        id: catTitle.toLowerCase(),
        title: catTitle,
        items: groups[catTitle]
      });
    });
    return categories;
  };

  const processedCategories = groupByCategory(menuItems);

  const filteredData =
    activeCategory === "all"
      ? processedCategories
      : processedCategories.filter((cat) => cat.id === activeCategory);

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-[#fdfaf7] selection:bg-[#d4af37] selection:text-black">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[3s] hover:scale-110"
          style={{ backgroundImage: "url('/menu/menu-bg1.jpg')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]" />

        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold tracking-widest uppercase"
          >
            <Utensils className="w-3 h-3" />
            Gastronomic Collection
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter"
          >
            OUR <span className="text-[#d4af37] italic font-serif">MENU.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-[#fdfaf7]/60 max-w-xl mx-auto font-medium"
          >
            A curated selection of artisanal brews and gourmet delights, crafted for the discerning palate.
          </motion.p>
        </div>
      </section>

      {/* CATEGORY NAV */}
      <div className="sticky top-16 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#fdfaf7]/5 px-6">
        <div className="max-w-7xl mx-auto py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max justify-center">
            <CategoryButton
              label="All Collections"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {processedCategories.map((cat: any) => (
              <CategoryButton
                key={cat.id}
                label={cat.title}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MENU LISTING */}
      <section className="py-24 px-6 max-w-7xl mx-auto min-h-[40vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[#d4af37]/40">Gathering the flavors...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-32"
            >
              {filteredData.length > 0 ? (
                filteredData.map((category: any) => (
                  <div key={category.id} className="relative">
                    <div className="flex items-center gap-6 mb-16">
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#fdfaf7]">
                        {category.title}
                      </h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                      {category.items.map((item: any, idx: number) => (
                        <motion.div
                          key={item._id || idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="group"
                        >
                          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#1a1a1a] shadow-2xl border border-white/5">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                            {item.featured && (
                              <div className="absolute top-4 right-4 bg-[#d4af37] text-black px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1 shadow-lg">
                                <Sparkles className="w-3 h-3" />
                                Chef's Pick
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-end gap-4">
                              <h3 className="text-2xl font-bold text-[#fdfaf7] group-hover:text-[#d4af37] transition-colors tracking-tight">
                                {item.name}
                              </h3>
                              <span className="text-xl font-black text-[#d4af37]">
                                ${item.price?.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-[#fdfaf7]/40 font-medium leading-relaxed line-clamp-2 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-[#fdfaf7]/20 font-medium tracking-tight">The menu is currently quiet. Check back soon for new creations.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* FOOTER CALLOUT */}
      <section className="py-32 px-6 border-t border-[#fdfaf7]/5 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <h4 className="text-2xl md:text-3xl font-black mb-8 italic font-serif">Personalized for your palate.</h4>
          <p className="text-[#fdfaf7]/40 mb-12 max-w-xl mx-auto">Discovered something you love? Book a table now to ensure your spot in the Aroma journey.</p>
          <motion.a
            href="/contact"
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-3 text-[#d4af37] font-black uppercase tracking-widest text-sm group"
          >
            Reserve a Table <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </div>
      </section>
    </main>
  );
}

function CategoryButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all border ${active
        ? "bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        : "text-[#fdfaf7]/40 border-white/5 hover:border-[#fdfaf7]/20 hover:text-[#fdfaf7]"
        }`}
    >
      {label}
    </button>
  );
}

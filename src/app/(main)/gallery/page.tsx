"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Sparkles, Camera, Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gallery");
        if (response.ok) {
          const data = await response.json();
          setImages(data.filter((i: any) => i.active !== false));
        }
      } catch (error) {
        console.error("Failed to fetch gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#fdfaf7] selection:bg-[#d4af37] selection:text-black pt-20">

      {/* SECTION 1: HERO */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-black tracking-widest uppercase"
        >
          <Camera className="w-3 h-3" />
          Visual Narrative
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
        >
          CAPTURED <span className="text-[#d4af37] italic font-serif">Essence.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-[#fdfaf7]/40 text-lg font-medium max-w-2xl mx-auto leading-relaxed"
        >
          A glimpse into the daily poetry of Café Aroma—from the rhythmic hiss of the espresso machine to the silent moments of inspiration.
        </motion.p>
      </section>

      {/* SECTION 2: IMMERSIVE GRID */}
      <section className="pb-32 px-6 min-h-[50vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[#d4af37]/40">Crystallizing the vision...</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-px md:bg-[#fdfaf7]/5 rounded-[3rem] overflow-hidden border border-[#fdfaf7]/5">
            {images.length > 0 ? (
              images.map((img, idx) => (
                <motion.div
                  key={img._id || idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#0a0a0a] relative group overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
                >
                  <img
                    src={img.image}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  />

                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase mb-4 block">
                        {img.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-[#fdfaf7] mb-4 tracking-tight">
                        {img.title}
                      </h3>
                      <div className="h-px w-12 bg-[#d4af37] mb-6" />
                      <p className="text-[#fdfaf7]/60 text-sm font-medium leading-relaxed max-w-xs">
                        {img.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-8 right-8 text-[#fdfaf7]/10 group-hover:text-[#d4af37]/20 transition-colors">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-40 text-center">
                <p className="text-xl text-[#fdfaf7]/20 font-medium tracking-tight">The gallery is waiting for its first exposure. Return soon.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* SECTION 3: BOTTOM CALLOUT */}
      <section className="py-40 px-6 text-center bg-[#fdfaf7] text-[#1a0f0a]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Heart className="w-12 h-12 text-[#7f5539] mx-auto mb-8" />
          <h2 className="text-4xl font-black tracking-tight mb-6 italic font-serif">Seen enough? Come taste the story.</h2>
          <p className="text-lg text-[#1a0f0a]/60 font-medium mb-12">Every frame you see here is a promise of the quality and ambiance that awaits you.</p>
          <a
            href="/contact"
            className="inline-block px-12 py-5 bg-[#1a0f0a] text-[#fdfaf7] font-black rounded-full hover:bg-[#d4af37] hover:text-black transition-all uppercase tracking-widest text-sm"
          >
            Visit the Sanctuary
          </a>
        </motion.div>
      </section>

    </main>
  );
}

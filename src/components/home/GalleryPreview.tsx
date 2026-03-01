"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import GalleryImage from "../gallery/GalleryImage";
import { motion } from "framer-motion";
import { Image as ImageIcon, ChevronRight, Sparkles } from "lucide-react";
import CinematicScroll from "../ui/CinematicScroll";

const staticImages = [
  { src: "/assets/gallery1.jpg", alt: "The Rhythmic Pour" },
  { src: "/assets/gallery2.jpg", alt: "Artisan Details" },
  { src: "/assets/gallery3.jpg", alt: "Sweet Compositions" },
  { src: "/assets/gallery4.jpg", alt: "The Sanctuary Seating" },
  { src: "/assets/gallery5.jpg", alt: "Roasting Rituals" },
  { src: "/assets/gallery6.jpg", alt: "Nocturnal Glow" },
];

export default function GalleryPreview() {
  const [images, setImages] = useState<any[]>(staticImages);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`}/api/gallery`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setImages(data.map((img: any) => ({ src: img.image, alt: img.title })));
          }
        }
      } catch (error) {
        console.log("Using static gallery images");
      }
    };
    fetchGallery();
  }, []);
  return (
    <div className="bg-[#0a0a0a] pt-32 relative">
      {/* Heading Container */}
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase">
            <Sparkles className="w-3 h-3" />
            Visual Narratives
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#fdfaf7] tracking-tighter leading-none mb-6">
            MOMENTS IN <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Motion.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Button asChild variant="ghost" className="text-[#fdfaf7]/40 hover:text-[#d4af37] font-black uppercase tracking-widest text-xs p-0 h-auto hover:bg-transparent group">
            <Link href="/gallery" className="flex items-center gap-3">
              Explore the Archive
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Cinematic Horizontal Scroll (Now unconstrained) */}
      <CinematicScroll
        items={images.map(img => ({
          src: img.src,
          title: img.alt,
          subtitle: "The Collection"
        }))}
      />

      {/* Bottom spacer to prevent abrupt transition */}
      <div className="h-32" />
    </div>
  );
}


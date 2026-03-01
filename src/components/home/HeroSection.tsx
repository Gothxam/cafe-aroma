"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { Coffee, ChevronRight, Sparkles, Play } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Magnetic from "../ui/Magnetic";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Spring for magnetic-like feel on some elements
  const springX = useSpring(0, { stiffness: 100, damping: 30 });
  const springY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    springX.set(x);
    springY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* BACKGROUND LAYER - THE REVEAL */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-full bg-cover bg-center brightness-50"
          style={{ backgroundImage: "url('/assets/gallery1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]" />
      </motion.div>

      {/* TEXT MASK LAYER - "AROMA" */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-[0.03]">
        <motion.h1
          style={{ y: textY, x: springX }}
          className="text-[25vw] font-black tracking-tighter leading-none text-white select-none whitespace-nowrap"
        >
          AROMA
        </motion.h1>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-20 text-center px-6 w-full max-w-7xl">
        {/* Floating Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-8 py-3 text-[10px] font-black tracking-[0.5em] uppercase text-[#d4af37] backdrop-blur-xl"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          Cinematic Experience
        </motion.div>

        {/* The Main Title */}
        <div className="relative overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-7xl md:text-[12.5rem] font-black tracking-tighter leading-[0.75] text-[#fdfaf7] uppercase"
          >
            BEYOND THE <br />
            <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Flavor.</span>
          </motion.h2>
        </div>

        {/* Staggered Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <p className="text-xl md:text-3xl text-[#fdfaf7]/40 font-medium leading-tight tracking-tight">
            A rhythmic exploration of beans, <br className="hidden md:block" />
            steam, and the stories they carry.
          </p>
        </motion.div>

        {/* Cinematic Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12"
        >
          <Magnetic>
            <Button asChild className="group relative overflow-hidden bg-white text-black font-black px-16 h-20 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase tracking-widest text-xs">
              <Link href="/menu" className="flex items-center gap-3">
                Explore the Manuscript
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </Magnetic>

          <Magnetic>
            <Link href="/gallery" className="group flex items-center gap-4 text-[#fdfaf7] font-black uppercase tracking-[0.4em] text-[10px] hover:text-[#d4af37] transition-all">
              <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#d4af37] transition-colors">
                <Play className="w-4 h-4 fill-white group-hover:fill-[#d4af37]" />
              </div>
              Watch the Story
            </Link>
          </Magnetic>
        </motion.div>
      </div>

      {/* LIGHT LEAK EFFECT */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#d4af37]/5 rounded-full blur-[200px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[200px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      {/* SCROLL LINE */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black tracking-[0.4em] text-[#fdfaf7]/20 uppercase">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-[#d4af37] via-[#d4af37]/20 to-transparent" />
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Heart, ChevronRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import Magnetic from "../ui/Magnetic";

export default function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progressLineHeight = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-[#0a0a0a] py-40 px-6 relative overflow-hidden">
      {/* SCROLL PROGRESS LINE */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-white/5 md:block hidden">
        <motion.div
          style={{ height: progressLineHeight }}
          className="w-full bg-[#d4af37] origin-top shadow-[0_0_15px_#d4af37]"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-24 md:grid-cols-2">

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[700px] w-full overflow-hidden rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] group border border-white/5"
          >
            <Image
              src="/assets/about.jpg"
              alt="The Aroma Heritage"
              fill
              className="object-cover transition-transform duration-[4s] group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-12 left-12 p-10 bg-black/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <p className="text-[10px] font-black text-[#d4af37] tracking-[0.5em] uppercase mb-3">Legacy</p>
              <p className="text-4xl font-black text-[#fdfaf7] tracking-tighter">EST. <br /> 1998</p>
            </div>
          </motion.div>

          {/* CONTENT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-16"
          >
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase">
                <Sparkles className="w-4 h-4" />
                The Heritage Story
              </div>
              <h2 className="text-7xl md:text-9xl font-black text-[#fdfaf7] tracking-tighter leading-[0.8] uppercase">
                CRAFTED BY <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Obsession.</span>
              </h2>
              <div className="space-y-8 text-2xl md:text-3xl text-[#fdfaf7]/30 font-medium leading-tight tracking-tight">
                <p>
                  What started as a quiet dream to curate a sanctuary for the senses has evolved into a cornerstone of the city. We believe that every cup tells a story of origin, effort, and excellence.
                </p>
                <p>
                  Our mission is simple: to provide a momentary escape from the rhythmic pulse of the world, one perfectly pulled shot at a time.
                </p>
              </div>
            </div>

            <div className="pt-10">
              <Magnetic>
                <Button asChild className="bg-white hover:bg-[#d4af37] text-black font-black px-20 h-24 rounded-[2.5rem] transition-all shadow-2xl uppercase tracking-[0.2em] text-[11px] group">
                  <Link href="/about" className="flex items-center gap-4">
                    Explore the Manuscript
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

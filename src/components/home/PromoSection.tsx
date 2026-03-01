"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { Coffee, Award, Sparkles, Quote } from "lucide-react";

export default function PromoSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#0a0a0a]">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* IMAGE SIDE - EDITORIAL STYLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[600px] md:h-[700px] rounded-[4rem] overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            <img
              src="/assets/gallery5.jpg"
              alt="The Craftsmanship"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-12 left-12 right-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-8 bg-[#fdfaf7]/5 backdrop-blur-2xl rounded-3xl border border-white/10"
              >
                <Quote className="w-8 h-8 text-[#d4af37] mb-4 opacity-50" />
                <p className="text-xl md:text-2xl text-[#fdfaf7] font-serif italic leading-relaxed">
                  "Coffee is the silent language of the morning, spoken best between friends and strangers alike."
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* CONTENT SIDE - STORYTELLING */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase">
                <Sparkles className="w-3 h-3" />
                The Heritage
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[#fdfaf7] tracking-tighter leading-tight">
                A Legacy in Every <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Roasted Bean.</span>
              </h2>
              <p className="text-lg text-[#fdfaf7]/50 leading-relaxed font-medium max-w-xl">
                Our journey began with a simple pursuit: finding the rhythmic balance between temperature, time, and talent. Today, we invite you to be part of that ongoing story.
              </p>
            </div>

            {/* Minimalist Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
              {[
                { label: "Awards Won", value: "05", icon: Award },
                { label: "Origins", value: "12", icon: Coffee },
                { label: "Precision", value: "100%", icon: Sparkles },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-[#d4af37] opacity-60">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-[10px] font-black tracking-widest uppercase">{stat.label}</span>
                  </div>
                  <p className="text-4xl font-black text-[#fdfaf7] tracking-tighter">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Button asChild className="bg-[#fdfaf7] hover:bg-[#d4af37] text-black font-black px-12 h-16 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-xs">
                <Link href="/about">Discover the Journey</Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

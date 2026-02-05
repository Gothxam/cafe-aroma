"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { Coffee, Flame, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/gallery1.jpg')",
        }}
      />
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-coffee-bean/10 via-background/10 to-almond-cream/30  backdrop-blur-md" />
      
      {/* Multiple decorative background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Primary gradient blob */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-coffee-bean/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-almond-cream/10 blur-3xl" />
        {/* Accent blobs */}
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-camel/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-32 text-center w-full">
        {/* Top accent badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-coffee-bean/40 px-4 py-2 text-sm font-medium text-almond-cream backdrop-blur-sm border border-almond-cream/80"
        >
          <Sparkles className="h-4 w-4" />
          Premium Café Experience
        </motion.div>

        {/* Animated headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mx-auto max-w-4xl text-5xl md:text-7xl font-black tracking-tight text-foreground leading-tight"
        >
          <span className="block">Where Every Cup</span>
          <span className="block bg-gradient-to-r from-coffee-bean to-dusty-olive  bg-clip-text text-transparent ">Feels Like Home</span>
        </motion.h1>

        {/* Subtext with icons */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-zinc-800 leading-relaxed"
        >
          Discover the perfect blend of freshly roasted coffee, artisan pastries, and warm hospitality. Your favorite escape awaits.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Coffee, label: "Specialty Coffee" },
            { icon: Flame, label: "Fresh Pastries" },
            { icon: Sparkles, label: "Cozy Ambiance" }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 rounded-fullmb-6 rounded-full bg-coffee-bean/40 px-4 py-2 text-sm font-medium text-almond-cream backdrop-blur-sm border border-almond-cream/80">
              <feature.icon className="h-4 w-4" />
              {feature.label}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-coffee-bean to-camel hover:from-coffee-bean/70 hover:to-camel/70 text-almond-cream px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
            <Link href="/menu" className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              View Our Menu
            </Link>
          </Button>

          <Button asChild  size="lg" className="bg-gradient-to-r from-ebony to-dusty-olive hover:from-ebony/70 hover:to-dusty-olive/70 text-almond-cream hover:shadow-2xl transition-all px-8 h-12 text-base hover:text-almond-cream font-semibold border-0">
            <Link href="/contact" className="flex items-center gap-2">
              Visit Us Today
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

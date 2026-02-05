"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { Coffee, Zap, Award } from "lucide-react";

export default function PromoSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-r from-coffee-bean via-camel to-coffee-bean">
      {/* Animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-coffee-bean/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-camel/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 md:grid-cols-3 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-almond-cream leading-tight">
                Experience Premium Coffee Like Never Before
              </h2>
              <p className="text-lg text-almond-cream/90 leading-relaxed max-w-xl">
                Every cup is crafted with passion using ethically sourced beans. From our skilled baristas to your taste buds, quality is our obsession.
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3 pt-4">
              {[
                { icon: Award, label: "Award Winning", value: "5+ Wins" },
                { icon: Coffee, label: "Premium Blend", value: "12+ Origins" },
                { icon: Zap, label: "Fresh Daily", value: "100% Fresh" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-dusty-olive/40 backdrop-blur-sm rounded-lg p-4 border border-almond-cream/20">
                  <stat.icon className="h-6 w-6 text-saddle-brown shrink-0" />
                  <div>
                    <p className="text-sm text-almond-cream/70">{stat.label}</p>
                    <p className="font-bold text-almond-cream">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className=" relative bg-gradient-to-r from-ebony to-dusty-olive hover:from-ebony/70 hover:to-dusty-olive/70 text-almond-cream hover:shadow-2xl transition-all px-8 h-12 text-base font-semibold border-0">
                <Link href="/menu">Order Now</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right side - Image placeholder with gradient */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-almond-cream/20"
          >
            <div className="absolute inset-0 bg-linear-to-br from-camel via-almond-cream to-coffee-bean opacity-80" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Coffee className="h-32 w-32 text-almond-cream/30 mb-4" />
              <h3 className="text-2xl font-black text-almond-cream">Premium Quality</h3>
              <p className="text-almond-cream/80 mt-2">Crafted to Perfection</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

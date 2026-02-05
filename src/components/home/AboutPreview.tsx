"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="relative bg-gradient-to-r from-dusty-olive via-ebony to-dusty-olive py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-40 left-1/4 w-80 h-80 rounded-full bg-dusty-olive/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl border-4 border-almond-cream"
          >
            <Image
              src="/assets/about.jpg"
              alt="Our café story"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-dusty-olive to-ebony px-5 py-2.5 text-sm font-semibold text-charcoal-brown border-2 border-charcoal-brown">
              <Heart className="w-4 h-4 fill-charcoal-brown" />
              Our Story
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
              Brewed with <span className="bg-linear-to-r from-coffee-bean to-camel bg-clip-text text-transparent">Love</span>
            </h2>

            <p className="text-lg text-foreground/70 leading-relaxed">
              What started as a small dream to create a warm, welcoming space has grown into a café loved by locals. From carefully sourced beans to thoughtfully crafted dishes, every detail is made with care and passion.
            </p>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Whether you're here for a quick coffee or a long conversation, we want you to feel right at home. This is more than a café—it's a gathering place for our community.
            </p>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-coffee-bean to-camel hover:from-coffee-bean hover:to-camel text-almond-cream hover:shadow-2xl transition-all px-8 h-12 text-base font-semibold border-0">
                <Link href="/about">Read Our Full Story</Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

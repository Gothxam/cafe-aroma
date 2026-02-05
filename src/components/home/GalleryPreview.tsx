"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import GalleryImage from "../../components/gallery/GalleryImage";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

const images = [
   { src: "/assets/gallery1.jpg", alt: "Cafe ambience" },
  { src: "/assets/gallery2.jpg", alt: "Coffee served" },
  { src: "/assets/gallery3.jpg", alt: "Dessert plate" },
  { src: "/assets/gallery4.jpg", alt: "Seating area" },
  { src: "/assets/gallery5.jpg", alt: "Bar counter" },
  { src: "/assets/gallery6.jpg", alt: "Evening lights" },
];

export default function GalleryPreview() {
  return (
    <section className="relative bg-gradient-to-br from-dusty-olive via-dry-sage-2 to-dusty-olive py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 bottom-0 w-80 h-80 rounded-full bg-ebony/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-dusty-olive to-dry-sage-2 px-5 py-2.5 text-sm font-semibold text-charcoal-brown border-2 border-charcoal-brown mx-auto">
            <ImageIcon className="w-4 h-4 " />
            Gallery
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            Moments That Matter
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Beautiful interiors, delicious food moments, and the warm atmosphere that makes Café Aroma special.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <GalleryImage {...img} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-coffee-bean to-camel hover:from-coffee-bean/70 hover:to-camel/70 text-almond-cream hover:shadow-2xl transition-all px-8 h-12 text-base mt-5 font-semibold border-0">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}


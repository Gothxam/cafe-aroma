"use client";

import ReviewCard from "../../components/reviews/ReviewCard";
import { motion } from "framer-motion";
import { Star, Sparkles, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ananya Sharma",
    comment:
      "Absolutely loved the ambience and the coffee. A perfect place to relax and unwind during a busy afternoon.",
    rating: 5,
  },
  {
    name: "Rohit Mehta",
    comment:
      "The attention to detail in every cup is remarkable. The staff treats coffee like an art form.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    comment:
      "One of my favorite cafés in the city. The desserts are not just food; they are handcrafted masterpieces.",
    rating: 5,
  },
];

export default function ReviewsPreview() {
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[150px] -translate-x-1/2" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase">
            <Quote className="w-3 h-3" />
            The Public Journal
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#fdfaf7] tracking-tighter leading-none mb-8">
            VOICES OF THE <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Aroma.</span>
          </h2>
          <p className="text-lg text-[#fdfaf7]/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Real stories from our patrons. Experience the sanctuary through the eyes of those who call it their favorite escape.
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

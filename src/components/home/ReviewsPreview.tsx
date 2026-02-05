"use client";

import ReviewCard from "../../components/reviews/ReviewCard";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya Sharma",
    comment:
      "Absolutely loved the ambience and the coffee. A perfect place to relax and unwind.",
    rating: 5,
  },
  {
    name: "Rohit Mehta",
    comment:
      "Great food, friendly staff, and cozy vibes. Highly recommended!",
    rating: 4,
  },
  {
    name: "Priya Verma",
    comment:
      "One of my favorite cafés in the city. The desserts are a must-try.",
    rating: 5,
  },
];

export default function ReviewsPreview() {
  return (
    <section className="relative bg-gradient-to-br from-camel via-almond-cream to-camel py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/3 top-0 w-80 h-80 rounded-full bg-camel/30 blur-3xl" />
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
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-camel to-almond-cream px-5 py-2.5 text-sm font-semibold text-coffee-bean border-2 border-camel mx-auto">
            <Star className="w-4 h-4 fill-coffee-bean" />
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Real experiences from people who love spending time with us. Join our growing family of happy customers.
          </p>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

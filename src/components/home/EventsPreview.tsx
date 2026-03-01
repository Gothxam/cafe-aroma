"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import EventCard from "../events/EventCard";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, Sparkles } from "lucide-react";

const staticEvents = [
  {
    title: "Midnight Jazz & Mocha",
    date: "Friday • 9 PM",
    description:
      "A nocturnal escape featuring live acoustic jazz and our signature triple-origin dark roast.",
  },
  {
    title: "The Art of the Pour",
    date: "Next Wednesday • 2 PM",
    description:
      "A masterclass in latte art and manual brewing. Learn from our head barista the secrets.",
  },
  {
    title: "Spring Harvest Brunch",
    date: "Weekends • 10 AM",
    description:
      "Celebrating the new season with farm-to-table delicacies and our limited edition floral brew.",
  },
];

export default function EventsPreview() {
  const [items, setItems] = useState<any[]>(staticEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`}/api/events`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setItems(data.slice(0, 3));
          }
        }
      } catch (error) {
        console.log("Using static event data");
      }
    };
    fetchEvents();
  }, []);
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-[0.3em] uppercase">
              <Sparkles className="w-3 h-3" />
              The Social Calendar
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#fdfaf7] tracking-tighter leading-none mb-6">
              LATEST <br /> <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Chapters.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="ghost" className="text-[#fdfaf7]/40 hover:text-[#d4af37] font-black uppercase tracking-widest text-xs p-0 h-auto hover:bg-transparent group">
              <Link href="/events" className="flex items-center gap-3">
                Chronicle Archives
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Events grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((event, index) => (
            <motion.div
              key={event.id || event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

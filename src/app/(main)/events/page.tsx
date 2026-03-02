"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Music, Coffee, Star, Calendar, ChevronRight, Sparkles, Loader2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}'}'}}`}/api/events`);
        if (response.ok) {
          const data = await response.json();
          // Filter out inactive events if needed, or sort
          setEvents(data.filter((e: any) => e.active !== false));
        }
      } catch (error) {
        console.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-[#fdfaf7] selection:bg-[#d4af37] selection:text-black pt-20">

      {/* SECTION 1: HERO */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-black tracking-widest uppercase"
        >
          <Calendar className="w-3 h-3" />
          The Social Calendar
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-9xl font-black tracking-tighter leading-none"
        >
          CURATED <span className="text-[#d4af37] italic font-serif">Gatherings.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-[#fdfaf7]/40 text-lg font-medium max-w-2xl mx-auto leading-relaxed"
        >
          From rhythmic nights to artisanal workshops, Café Aroma is more than a destination—it's where the city's heartbeat finds its tempo.
        </motion.p>
      </section>

      {/* SECTION 2: TIMELINE */}
      <section className="pb-32 px-6 relative min-h-[40vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-[#d4af37] animate-spin" />
            <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[#d4af37]/40">Aligning the constellations...</p>
          </div>
        ) : (
          <>
            {/* Central Line */}
            <div className="absolute left-[50%] top-0 bottom-32 w-px bg-white/10 hidden md:block" />
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute left-[50%] top-0 bottom-32 w-px bg-[#d4af37] hidden md:block origin-top shadow-[0_0_20px_#d4af37]"
            />

            <div className="max-w-7xl mx-auto space-y-40">
              {events.length > 0 ? (
                events.map((event: any, idx: number) => (
                  <div key={event._id || idx} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                    {/* IMAGE SIDE */}
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex-1 w-full"
                    >
                      <div className="relative group overflow-hidden rounded-[3rem] aspect-video border border-white/5 shadow-2xl">
                        <img
                          src={event.image || "/assets/placeholder-event.jpg"}
                          alt={event.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                      </div>
                    </motion.div>

                    {/* CONTENT SIDE */}
                    <motion.div
                      initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex-1 text-center md:text-left"
                    >
                      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                        {(event.tags || ["Experience", "Special"]).map((tag: string) => (
                          <span key={tag} className="text-[10px] font-black tracking-widest uppercase px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded-full border border-[#d4af37]/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#fdfaf7] leading-tight">
                        {event.title}
                      </h3>

                      <div className="flex items-center justify-center md:justify-start gap-4 mb-6 text-[#d4af37] font-bold">
                        <div className="bg-[#d4af37] text-black px-3 py-1 text-sm rounded-lg font-black tracking-tighter">
                          {event.date}
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-sm uppercase tracking-widest">{event.time}</span>
                      </div>

                      <p className="text-[#fdfaf7]/40 text-lg font-medium leading-relaxed mb-10 max-w-xl">
                        {event.description}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-[#fdfaf7] text-black font-black rounded-full hover:bg-[#d4af37] transition-all uppercase tracking-widest text-xs"
                      >
                        Join the Experience
                      </motion.button>
                    </motion.div>

                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-[#fdfaf7]/20 font-medium tracking-tight">The social calendar is currently being curated. Return soon for new stories.</p>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* SECTION 3: CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto rounded-[4rem] bg-gradient-to-b from-[#1a1a1a] to-transparent p-16 border border-[#fdfaf7]/5">
          <Music className="w-12 h-12 text-[#d4af37] mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-black text-[#fdfaf7] mb-8 tracking-tight">Host Your Own <br /> Story with Us.</h2>
          <p className="text-[#fdfaf7]/40 mb-12 max-w-md mx-auto font-medium">Have an idea for a gathering or a workshop? Our space is your canvas. Let's create together.</p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="inline-block px-12 py-5 bg-[#d4af37] text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all uppercase tracking-widest text-sm"
          >
            Inquire Now
          </motion.a>
        </div>
      </section>

    </main>
  );
}

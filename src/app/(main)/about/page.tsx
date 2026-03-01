"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Coffee, Quote, History, MapPin, Sparkles, MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/Magnetic";

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Simplify scale logic
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

    // Section 2 scroll tracking
    const section2Ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress: section2Progress } = useScroll({
        target: section2Ref,
        offset: ["start center", "end center"]
    });
    const section2PathLength = useSpring(section2Progress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const section2IndicatorHeight = useTransform(section2PathLength, [0, 1], ["0%", "100%"]);

    return (
        <main ref={containerRef} className="relative bg-[#0a0a0a] text-[#fdfaf7] selection:bg-[#d4af37] selection:text-black min-h-screen">

            {/* SECTION 1: THE OVERTURE (HERO) */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale: scale }}
                    className="absolute inset-0 z-0"
                >
                    <div
                        className="w-full h-full bg-cover bg-center brightness-[0.4]"
                        style={{ backgroundImage: "url('/assets/about.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]" />
                </motion.div>

                <div className="relative z-10 text-center px-6 w-full max-w-6xl">
                    {/* Floating Label */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-12 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 px-10 py-4 text-[10px] font-black tracking-[0.5em] uppercase text-[#d4af37] backdrop-blur-3xl"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                        The Heritage Chapter
                    </motion.div>

                    {/* Dramatic Headline */}
                    <div className="overflow-hidden mb-12">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="text-7xl md:text-[13rem] font-black tracking-tighter leading-[0.75] uppercase"
                        >
                            OUR <br />
                            <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Journey.</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        className="text-xl md:text-3xl text-[#fdfaf7]/40 max-w-3xl mx-auto font-medium leading-tight tracking-tight"
                    >
                        From a single bean to a sanctuary of senses. <br className="hidden md:block" />
                        Discover the rhythm behind the roast.
                    </motion.p>
                </div>

                {/* SCROLL PROGRESS INDICATOR */}
                <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[10px] font-black tracking-[0.4em] text-[#d4af37] uppercase"
                    >
                        Scroll to Read
                    </motion.span>
                    <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"
                            animate={{ y: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* SECTION 2: THE GENESIS (SIDE STORY) */}
            <section ref={section2Ref} className="py-60 px-6 relative">
                {/* Narrative Progress Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 md:block hidden z-20 pointer-events-none">
                    <motion.div
                        className="w-full bg-[#d4af37] origin-top shadow-[0_0_15px_#d4af37]"
                        style={{ height: section2IndicatorHeight }}
                    />
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="space-y-12"
                    >
                        <div className="p-8 border-l-4 border-[#d4af37] bg-white text-black rounded-r-[3rem] shadow-3xl">
                            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#d4af37] mb-4">Chapter 01</p>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                                THE FIRST <br /> ROAST.
                            </h2>
                        </div>
                        <div className="space-y-8 text-2xl md:text-3xl text-[#fdfaf7]/30 font-medium leading-tight tracking-tight">
                            <p>
                                Every legend starts with a whisper. Ours began in the high-altitude mists of Ethiopia, where coffee isn't just a crop—it's a heartbeat.
                            </p>
                            <p>
                                In 2010, we brought that heartbeat to the city. Not as a shop, but as a sanctuary. A place where time slows down as the steam rises.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-4xl group">
                            <img
                                src="/assets/gallery4.jpg"
                                alt="The Roastery"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                        </div>
                        {/* Floating Credential */}
                        <div className="absolute -bottom-10 -right-10 p-12 bg-white text-black rounded-[3rem] shadow-4xl border-[10px] border-[#0a0a0a]">
                            <p className="text-5xl font-black tracking-tighter leading-none mb-2">14+</p>
                            <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Years of Pursuit</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: THE CORE (INTERACTIVE TILES) */}
            <section className="py-60 px-6 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                        <div className="max-w-2xl">
                            <p className="text-[#d4af37] font-black tracking-[0.5em] uppercase text-xs mb-6">Our DNA</p>
                            <h2 className="text-6xl md:text-8xl font-black text-[#fdfaf7] tracking-tighter leading-[0.85] uppercase">THE PILLARS <br /> OF AROMA.</h2>
                        </div>
                        <p className="text-xl md:text-2xl text-[#fdfaf7]/20 max-w-sm font-medium leading-tight">
                            We don't follow trends. We refine rituals. These are the three vows we live by.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <ValueItem
                            step="I"
                            title="ETHICAL OBSESSION"
                            desc="Beyond fair trade. We source directly from farmers who treat the soil like their own soul."
                        />
                        <ValueItem
                            step="II"
                            title="ARTISAN PRECISION"
                            desc="Every degree of temperature, every second of extraction—measured to evoke pure emotion."
                        />
                        <ValueItem
                            step="III"
                            title="QUIET HOSPITALITY"
                            desc="A service that understands the value of silence and the warmth of a genuine smile."
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE INVITATION */}
            <section className="py-80 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-7xl md:text-[9rem] font-black text-[#fdfaf7] tracking-tighter leading-[0.8] mb-16 uppercase">
                        BE PART OF THE <br />
                        <span className="text-[#d4af37] italic font-serif lowercase tracking-normal">Legacy.</span>
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <Magnetic>
                            <Button asChild className="bg-white hover:bg-[#d4af37] text-black font-black px-20 h-24 rounded-full transition-all shadow-4xl uppercase tracking-[0.2em] text-[10px] group">
                                <Link href="/menu" className="flex items-center gap-4">
                                    Explore the Menu
                                    <MoveRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                </Link>
                            </Button>
                        </Magnetic>

                        <Link href="/contact" className="text-[#fdfaf7]/30 hover:text-[#d4af37] font-black uppercase tracking-[0.4em] text-[10px] transition-all flex items-center gap-4 group">
                            Visit the Sanctuary
                            <div className="h-px w-10 bg-white/10 group-hover:bg-[#d4af37] group-hover:w-20 transition-all" />
                        </Link>
                    </div>
                </motion.div>
            </section>

        </main>
    );
}

function ValueItem({ step, title, desc }: { step: string, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-12 rounded-[3.5rem] bg-[#111] hover:bg-[#d4af37] transition-all duration-700 overflow-hidden"
        >
            <span className="text-7xl font-black text-[#fdfaf7]/5 group-hover:text-black/10 transition-colors absolute -top-4 -right-4">
                {step}
            </span>
            <div className="relative z-10">
                <h4 className="text-3xl font-black mb-6 text-[#fdfaf7] group-hover:text-black transition-colors tracking-tighter">{title}</h4>
                <p className="text-xl text-[#fdfaf7]/30 group-hover:text-black/60 transition-colors leading-tight font-medium">
                    {desc}
                </p>
            </div>
            {/* Animated corner */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#0a0a0a]/20 translate-x-12 translate-y-12 rotate-45 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
        </motion.div>
    );
}

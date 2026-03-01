"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type CinematicScrollProps = {
    items: {
        src: string;
        title: string;
        subtitle: string;
    }[];
};

export default function CinematicScroll({ items }: CinematicScrollProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // For 6 items at 45vw each (~270vw total), moving -60% roughly reveals all.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[350vh] bg-transparent">
            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex flex-nowrap gap-16 md:gap-32 px-[10vw] w-max items-center"
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="group relative h-[60vh] w-[80vw] md:w-[45vw] flex-shrink-0 overflow-hidden rounded-[3rem] md:rounded-[5rem] bg-[#1a1a1a] shadow-3xl border border-white/5"
                        >
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                                priority={index < 2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
                            <div className="absolute bottom-12 left-12 right-12 translate-y-8 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                                <p className="text-[10px] font-black text-[#d4af37] tracking-[0.5em] uppercase mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                    {item.subtitle}
                                </p>
                                <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                    {/* Ghost ending item for smoother transition */}
                    <div className="w-[10vw] flex-shrink-0 h-10" />
                </motion.div>
            </div>
        </section>
    );
}

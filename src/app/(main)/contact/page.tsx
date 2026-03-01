"use client";

import { motion } from "framer-motion";
import ReservationForm from "@/components/contact/ReservationForm";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, MailOpen, Landmark } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#fdfaf7] selection:bg-[#d4af37] selection:text-black pt-20">

            {/* SECTION 1: HERO */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-30"
                    style={{ backgroundImage: "url('/assets/gallery3.jpg')" }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

                <div className="relative z-20 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-widest uppercase"
                    >
                        <MailOpen className="w-3 h-3" />
                        Formal Invitation
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-[#fdfaf7] mb-4 tracking-tighter"
                    >
                        FIND <span className="text-[#d4af37] italic font-serif">Us.</span>
                    </motion.h1>
                </div>
            </section>

            {/* SECTION 2: MAIN CONTENT */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                        {/* LEFT: INFO (Formal Invitation Style) */}
                        <div className="lg:col-span-5 space-y-16">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12"
                            >
                                <div className="space-y-8">
                                    <div className="inline-flex items-center gap-3 text-[#d4af37] font-black tracking-[0.2em] uppercase text-xs">
                                        <Landmark className="w-4 h-4" />
                                        The Sanctuary Coordinates
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-[#fdfaf7] leading-tight tracking-tight">
                                        Experience the <br /> Aroma in person.
                                    </h2>

                                    <div className="grid grid-cols-1 gap-10">
                                        <ContactInfoDetail
                                            icon={MapPin}
                                            label="Address"
                                            content="123 Coffee Lane, Artisan District, CA 90210"
                                        />
                                        <ContactInfoDetail
                                            icon={Phone}
                                            label="Phone"
                                            content="+1 (555) 123-4567"
                                        />
                                        <ContactInfoDetail
                                            icon={Mail}
                                            label="Digital"
                                            content="hello@cafearoma.com"
                                        />
                                        <ContactInfoDetail
                                            icon={Clock}
                                            label="Aperture"
                                            content="Mon - Sun: 7:00 AM - 9:00 PM"
                                        />
                                    </div>
                                </div>

                                <div className="pt-12 border-t border-white/5 space-y-6">
                                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#fdfaf7]/30">The Social Network</p>
                                    <div className="flex gap-6">
                                        <SocialIcon icon={Instagram} />
                                        <SocialIcon icon={Facebook} />
                                        <SocialIcon icon={Twitter} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: FORM (Reservation Desk) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7"
                        >
                            <ReservationForm />
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* SECTION 3: MAP (CINEMATIC FULL WIDTH) */}
            <section className="h-[50vh] relative grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
                <div className="absolute inset-0 bg-[#0a0a0a]/40 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-xs font-black tracking-[0.3em] uppercase text-[#d4af37]">
                        <MapPin className="w-4 h-4" />
                        Explore the District
                    </div>
                </div>
                <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                    {/* Map Mockup */}
                    <div className="opacity-20 flex flex-col items-center">
                        <MapPin className="w-16 h-16 mb-4" />
                        <span className="font-mono text-xs tracking-widest uppercase">Geographical Data Visualization</span>
                    </div>
                </div>
            </section>

        </main>
    );
}

function ContactInfoDetail({ icon: Icon, label, content }: { icon: any, label: string, content: string }) {
    return (
        <div className="flex items-start gap-6 group">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#d4af37]/5 border border-[#d4af37]/10 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/30 mb-1">{label}</p>
                <p className="text-xl font-bold text-[#fdfaf7] tracking-tight">{content}</p>
            </div>
        </div>
    );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
    return (
        <motion.a
            href="#"
            whileHover={{ scale: 1.1, y: -2 }}
            className="text-[#fdfaf7]/40 hover:text-[#d4af37] transition-colors"
        >
            <Icon className="w-6 h-6" />
        </motion.a>
    );
}

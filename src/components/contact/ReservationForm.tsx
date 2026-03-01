"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar, Clock, Users, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function ReservationForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 2,
        preferences: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert("Failed to secure reservation. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        // ... (existing success UI)
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 text-center bg-[#1a0f0a] rounded-[3rem] border border-[#d4af37]/20 h-full min-h-[500px] shadow-3xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="mb-8 rounded-full bg-[#d4af37]/10 p-6 border border-[#d4af37]/20"
                >
                    <CheckCircle2 className="w-16 h-16 text-[#d4af37]" />
                </motion.div>
                <h3 className="text-3xl font-black text-[#fdfaf7] mb-4 tracking-tight">Reservation Secured.</h3>
                <p className="text-[#fdfaf7]/50 max-w-sm font-medium leading-relaxed">
                    The table is being prepared. A confirmation of your invitation has been sent to your digital inbox.
                </p>
                <Button
                    variant="ghost"
                    className="mt-12 text-[#d4af37] font-black uppercase tracking-widest text-xs hover:bg-[#d4af37]/10"
                    onClick={() => setIsSubmitted(false)}
                >
                    Book another Chapter
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#1a0f0a] p-10 md:p-16 rounded-[4rem] border border-[#fdfaf7]/5 shadow-3xl relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#d4af37]/10 transition-colors duration-1000" />

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black tracking-widest uppercase">
                    <Sparkles className="w-3 h-3" />
                    Reservation Desk
                </div>
                <h2 className="text-4xl font-black text-[#fdfaf7] mb-10 tracking-tighter">
                    Request a <span className="text-[#d4af37] italic font-serif">Table.</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Full Name</label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your Name"
                                className="h-14 bg-transparent border-white/10 text-white placeholder:text-white/20 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-2xl transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Digital Address</label>
                            <Input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email@domain.com"
                                className="h-14 bg-transparent border-white/10 text-white placeholder:text-white/20 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] rounded-2xl transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Phone</label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+91 000 000 0000"
                                className="h-14 bg-transparent border-white/10 text-white placeholder:text-white/20 focus:border-[#d4af37] rounded-2xl transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Date</label>
                            <Input
                                required
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="h-14 bg-transparent border-white/10 text-white focus:border-[#d4af37] rounded-2xl transition-all [color-scheme:dark]"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Time</label>
                            <Input
                                required
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="h-14 bg-transparent border-white/10 text-white focus:border-[#d4af37] rounded-2xl transition-all [color-scheme:dark]"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Guests</label>
                            <Input
                                required
                                type="number"
                                min="1"
                                max="20"
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                placeholder="2"
                                className="h-14 bg-transparent border-white/10 text-white placeholder:text-white/20 focus:border-[#d4af37] rounded-2xl transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black tracking-widest uppercase text-[#fdfaf7]/40 ml-1">Preferences</label>
                        <Textarea
                            value={formData.preferences}
                            onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                            placeholder="Special requirements or dietary notes..."
                            className="bg-transparent border-white/10 text-white placeholder:text-white/20 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] min-h-[120px] rounded-3xl transition-all"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#d4af37] hover:bg-[#c19b2e] text-black font-black h-16 rounded-2xl transition-all shadow-[0_10px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] uppercase tracking-[0.2em] text-xs"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                SECURING...
                            </span>
                        ) : (
                            <span className="flex items-center gap-3">
                                <Send className="w-5 h-5" />
                                CONFIRM REQUEST
                            </span>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}

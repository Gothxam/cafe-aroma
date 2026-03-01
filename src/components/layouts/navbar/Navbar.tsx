"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui/sheet";
import { Menu, Coffee, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../../ui/Magnetic";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
      ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-3"
      : "bg-transparent py-6"
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* Logo */}
        <Magnetic>
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-transform group-hover:scale-110">
              <Coffee className="h-6 w-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-[#fdfaf7] leading-none mb-1">
                CAFÉ AROMA
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#d4af37]">
                EST. 2010
              </span>
            </div>
          </Link>
        </Magnetic>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-[11px] font-black tracking-widest uppercase text-[#fdfaf7]/60 hover:text-[#d4af37] transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-5 right-5 h-px bg-[#d4af37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10 mx-4" />
          <Magnetic>
            <Button
              asChild
              className="bg-[#d4af37] text-black font-black uppercase tracking-widest text-[10px] h-10 px-8 rounded-full hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all"
            >
              <Link href="/contact">
                Visit the Sanctuary
              </Link>
            </Button>
          </Magnetic>
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12 rounded-2xl border border-white/5 bg-white/5 text-[#fdfaf7] hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full bg-[#0a0a0a] border-white/5 p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-20">
              <div className="h-10 w-10 bg-[#d4af37] rounded-xl flex items-center justify-center">
                <Coffee className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#fdfaf7]">CAFÉ AROMA</span>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-4xl font-black text-[#fdfaf7] hover:text-[#d4af37] transition-colors tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-white/5">
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#fdfaf7]/30 mb-8">Reservations</p>
              <Button asChild className="w-full bg-[#d4af37] text-black font-black uppercase tracking-widest text-xs h-14 rounded-2xl">
                <Link href="/contact">Book a Table</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

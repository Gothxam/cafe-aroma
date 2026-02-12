"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui/sheet";
import { Menu, Coffee, MapPin } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 mx-auto w-full  border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg">
      <div className="flex h-16 items-center justify-between px-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-coffee-bean to-camel shadow-md">
            <Coffee className="h-6 w-6 text-almond-cream" />
          </div>
          <span className="text-lg font-bold tracking-wide text-coffee-bean">
            Café Aroma
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-coffee-bean/10 hover:text-coffee-bean"
            >
              {link.name}
            </Link>
          ))}
          <Button
            size="sm"
            className="ml-2 bg-gradient-to-r from-coffee-bean to-camel text-almond-cream shadow-md hover:scale-105 transition"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Visit Us
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl hover:bg-coffee-bean/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[85%] bg-white/90 backdrop-blur-xl">
            
            {/* Mobile Header */}
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-coffee-bean to-camel">
                <Coffee className="h-5 w-5 text-almond-cream" />
              </div>
              <span className="text-lg font-semibold">Café Aroma</span>
            </div>

            {/* Links */}
            <nav className="mt-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-base font-medium transition hover:bg-coffee-bean/10 hover:text-coffee-bean"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <Button className="mt-auto w-full bg-gradient-to-r from-coffee-bean to-camel text-almond-cream shadow-lg">
              <MapPin className="mr-2 h-4 w-4" />
              Visit Us
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

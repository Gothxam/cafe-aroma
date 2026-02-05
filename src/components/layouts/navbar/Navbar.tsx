"use client";

import Link from "next/link";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui/sheet";
import { Menu, Coffee } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full border-b bg-coffee-bean/80 backdrop-blur-md border-coffee-bean/30 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-coffee-bean to-camel">
            <Coffee className="h-6 w-6 text-almond-cream" />
          </div>
          <span className="bg-linear-to-r from-coffee-bean to-camel bg-clip-text text-transparent">Café Aroma</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-dry-sage-2 transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-ebony to-dusty-olive group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <Button size="sm" className="bg-gradient-to-r from-coffee-bean to-camel hover:from-coffee-bean hover:to-camel text-almond-cream">Visit Us</Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-amber-100/50">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Button className="mt-4">Visit Us</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Coffee, MapPin, Phone, Clock, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-coffee-bean to-ebony text-almond-cream border-t-4 border-camel">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-linear-to-tl from-camel/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-coffee-bean to-camel">
              <Coffee className="h-6 w-6 text-almond-cream" />
            </div>
            <h3 className="text-xl font-black">Café Aroma</h3>
          </div>
          <p className="text-sm text-almond-cream/80 leading-relaxed">
            Cozy café serving fresh coffee, handcrafted food, and warm vibes since the day we opened our doors.
          </p>
          {/* Social links */}
          <div className="flex gap-3 pt-2">
            <a href="#" className="p-2 rounded-lg bg-almond-cream/10 hover:bg-camel transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-almond-cream/10 hover:bg-camel transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-almond-cream/10 hover:bg-camel transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-black mb-5 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-camel"></span>
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm text-almond-cream/80">
            <li><Link href="/menu" className="hover:text-camel transition-colors font-medium">Menu</Link></li>
            <li><Link href="/events" className="hover:text-camel transition-colors font-medium">Events</Link></li>
            <li><Link href="/gallery" className="hover:text-camel transition-colors font-medium">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-camel transition-colors font-medium">About</Link></li>
            <li><Link href="/contact" className="hover:text-camel transition-colors font-medium">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-black mb-5 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-camel"></span>
            Contact
          </h4>
          <ul className="space-y-4 text-sm text-almond-cream/80">
            <li className="flex gap-3 items-start">
              <MapPin className="h-5 w-5 text-camel shrink-0 mt-0.5" />
              <span>City Center, Your City</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="h-5 w-5 text-camel shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex gap-3 items-start">
              <Clock className="h-5 w-5 text-camel shrink-0 mt-0.5" />
              <span>10 AM – 11 PM<br/>Closed on Mondays</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-black mb-5 flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-camel"></span>
            Newsletter
          </h4>
          <p className="text-sm text-almond-cream/80 mb-4">
            Get updates on new menu items and special events.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-lg bg-almond-cream/10 border border-almond-cream/20 text-almond-cream placeholder:text-almond-cream/50 focus:border-camel focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-linear-to-r from-coffee-bean to-camel hover:from-coffee-bean hover:to-camel text-almond-cream font-semibold transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-almond-cream/10 py-6 px-4 text-center text-sm text-almond-cream/70">
        <p>© {new Date().getFullYear()} Café Aroma. All rights reserved. Crafted with ☕ and ❤️</p>
      </div>
    </footer>
  );
}

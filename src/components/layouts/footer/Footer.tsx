import Link from "next/link";
import { Coffee, MapPin, Phone, Clock, Facebook, Instagram, Twitter, Sparkles, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-[#fdfaf7] border-t border-white/5 selection:bg-[#d4af37] selection:text-black">

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-12">

          {/* Brand - Span 4 */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-transform group-hover:scale-110">
                <Coffee className="h-6 w-6 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none mb-1">CAFÉ AROMA</span>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#d4af37]">Since 2010</span>
              </div>
            </Link>
            <p className="text-sm text-[#fdfaf7]/40 leading-relaxed max-w-xs font-medium">
              We don't just serve coffee; we curate moments. Join us in our pursuit of the perfect roast and the perfect story.
            </p>
            <div className="flex gap-6">
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
            </div>
          </div>

          {/* Quick Links - Span 2 */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#d4af37] mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-black uppercase tracking-widest">
              <li><Link href="/menu" className="hover:text-[#d4af37] transition-colors">Menu</Link></li>
              <li><Link href="/events" className="hover:text-[#d4af37] transition-colors">Events</Link></li>
              <li><Link href="/gallery" className="hover:text-[#d4af37] transition-colors">Gallery</Link></li>
              <li><Link href="/about" className="hover:text-[#d4af37] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#d4af37] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info - Span 3 */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#d4af37] mb-8">Coordinates</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4 items-start group">
                <MapPin className="h-5 w-5 text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors shrink-0" />
                <span className="text-[#fdfaf7]/60 font-medium">123 Coffee Lane, Artisan District, Your City</span>
              </li>
              <li className="flex gap-4 items-center group">
                <Phone className="h-5 w-5 text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors shrink-0" />
                <span className="text-[#fdfaf7]/60 font-medium">+91 98765 43210</span>
              </li>
              <li className="flex gap-4 items-start group">
                <Clock className="h-5 w-5 text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors shrink-0" />
                <span className="text-[#fdfaf7]/60 font-medium">10 AM – 11 PM<br />Closed on Mondays</span>
              </li>
            </ul>
          </div>

          {/* Newsletter - Span 3 */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#d4af37] mb-8">Journal</h4>
            <p className="text-sm text-[#fdfaf7]/40 mb-8 font-medium">Subscribe to receive invitations to our exclusive events.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Digital Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-[#fdfaf7] placeholder:text-[#fdfaf7]/20 focus:border-[#d4af37] focus:outline-none transition-all pr-12"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#d4af37] hover:scale-110 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-[#fdfaf7]/20">
            <Sparkles className="w-3 h-3 text-[#d4af37]/40" />
            Crafted for the Discerning
          </div>
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[#fdfaf7]/20">
            © {new Date().getFullYear()} CAFÉ AROMA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="h-10 w-10 border border-white/10 rounded-xl flex items-center justify-center text-[#fdfaf7]/20 hover:text-[#d4af37] hover:border-[#d4af37] transition-all">
      <Icon className="w-5 h-5" />
    </a>
  );
}

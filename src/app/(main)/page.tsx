import type { Metadata } from "next";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import PromoSection from "@/components/home/PromoSection";
import EventsPreview from "@/components/home/EventsPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import ReviewsPreview from "@/components/home/ReviewsPreview";
import AboutPreview from "@/components/home/AboutPreview";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Café Aroma | The Sanctuary of Taste",
  description: "Experience the rhythmic heartbeat of the city's finest escape. Premium coffee, artisan pastries, and cinematic storytelling.",
};

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a]">
      <HeroSection />
      <FeaturedMenu />
      <PromoSection />
      <ReviewsPreview />
      <EventsPreview />
      <GalleryPreview />
      <AboutPreview />
    </main>
  );
}

import type { Metadata } from "next";
import FeaturedMenu from "../components/home/FeaturedMenu";
import PromoSection from "../components/home/PromoSection";
import EventsPreview from "../components/home/EventsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import ReviewsPreview from "../components/home/ReviewsPreview";
import AboutPreview from "../components/home/AboutPreview";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Café Aroma - Premium Coffee & Pastries",
  description: "Experience premium coffee, fresh pastries, and warm hospitality at Café Aroma.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedMenu />
      <PromoSection />
      <ReviewsPreview />
      <EventsPreview />
      <GalleryPreview />
      <AboutPreview />
    </>
  );
}

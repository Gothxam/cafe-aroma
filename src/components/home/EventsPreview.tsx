"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import EventCard from "../../components/events/EventCard";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const events = [
  {
    title: "Live Acoustic Night",
    date: "Friday • 7 PM",
    description:
      "Enjoy live acoustic music with your favorite coffee and snacks.",
  },
  {
    title: "Weekend Brunch Special",
    date: "Saturday & Sunday",
    description:
      "Special brunch menu available only on weekends.",
  },
  {
    title: "Coffee Tasting Session",
    date: "Next Wednesday",
    description:
      "Explore different coffee blends with our barista.",
  },
];

export default function EventsPreview() {
  return (
    <section className="relative bg-gradient-to-r from-dusty-olive via-ebony to-dusty-olive py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            What’s Happening
          </h2>
          <p className="mt-3 text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Join us for special events and memorable experiences.
          </p>
        </div>

        {/* Events grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-coffee-bean to-camel hover:from-coffee-bean hover:to-camel text-almond-cream hover:shadow-2xl transition-all px-8 h-12 text-base mt-5 font-semibold border-0">
            <Link href="/events">See All Events</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

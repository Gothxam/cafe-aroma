"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import MenuItemCard from "../../components/menu/MenuItemCard";
import { motion } from "framer-motion";
import { Coffee, Zap } from "lucide-react";

const featuredItems = [
  {
    name: "Signature Cappuccino",
    description: "Rich espresso with velvety microfoam and a hint of vanilla.",
    price: "₹180",
    isVeg: true,
    icon: "☕",
  },
  {
    name: "Creamy Pasta Alfredo",
    description: "Handmade pasta in our secret creamy sauce with fresh parmesan.",
    price: "₹320",
    isVeg: true,
    icon: "🍝",
  },
  {
    name: "Premium Grilled Sandwich",
    description: "Artisan bread, mozzarella, fresh veggies with house aioli.",
    price: "₹220",
    isVeg: true,
    icon: "🥪",
  },
  {
    name: "Decadent Chocolate Brownie",
    description: "Warm, fudgy brownie with dark chocolate drizzle & vanilla ice cream.",
    price: "₹150",
    isVeg: true,
    icon: "🍫",
  },
];

export default function FeaturedMenu() {
  return (
    <section className="relative bg-gradient-to-br from-almond-cream via-camel to-almond-cream py-24 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-camel/30 blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-camel/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-camel to-almond-cream px-5 py-2.5 text-sm font-semibold text-coffee-bean border-2 border-camel mx-auto">
            <Zap className="w-4 h-4" />
            Customer Favorites
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            Signature Selections
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Handpicked favorites made fresh daily. Experience the perfect blend of taste and quality that keeps our customers coming back.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full rounded-2xl bg-card border border-coffee-bean/40 p-6 hover:border-camel transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden relative">
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-coffee-bean to-almond-cream group-hover:from-coffee-bean/40 group-hover:to-almond-cream/40 transition-all duration-300 -z-10" />
                
                {/* Icon with background */}
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-coffee-bean transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-foreground/60 mb-5 line-clamp-2 group-hover:text-foreground/80 transition-colors">
                  {item.description}
                </p>

                {/* Price and badge */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black bg-linear-to-r from-coffee-bean to-camel bg-clip-text text-transparent">{item.price}</span>
                  <span className="text-xs bg-linear-to-r from-coffee-bean to-almond-cream text-coffee-bean px-3 py-1 rounded-full font-semibold border border-coffee-bean">
                    ✓ Veg
                  </span>
                </div>
              </div>
            </motion.div>
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
          <Button asChild size="lg" className=" relative bg-gradient-to-r from-ebony to-dusty-olive hover:from-ebony/70 hover:to-dusty-olive/70 text-almond-cream hover:shadow-2xl transition-all px-8 h-12 text-base font-semibold border-0">
            <Link href="/menu" className="flex items-center gap-2">
              Explore Full Menu
              <Coffee className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

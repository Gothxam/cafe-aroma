
"use client";

import { menuData } from "../../../data/menu";
import MenuSection from "@/components/menu/MenuSection";
import FeaturedItems from "@/components/menu/FeaturedItems";
import { useState } from "react";
import FilterButton from "@/components/menu/FilterButton";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredData =
    activeCategory === "all"
      ? menuData
      : menuData.filter((cat) => cat.id === activeCategory);

  return (
    <section
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/menu/menu-bg1.jpg')" }}
    >
      <div className="min-h-screen bg-dark-walnut/60 px-4 py-20">

        {/* Glass container */}
        <div className="mx-auto max-w-6xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">
          <div className="mb-16 text-center">
  <h1 className="text-5xl lg:text-6xl font-extrabold text-almond-cream tracking-wide">
    OUR MENU
  </h1>

  <p className="mt-4 max-w-2xl mx-auto text-white/70 text-lg">
    Freshly prepared dishes, crafted with quality ingredients and
    served with care. Explore our selection and find your favorite.
  </p>
</div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap gap-3 mb-12">
            <FilterButton
              label="All"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />

            {menuData.map((cat) => (
              <FilterButton
                key={cat.id}
                label={cat.title}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>

          {/* MENU CONTENT */}
          <div className="space-y-32">
  {filteredData.map((category) => {
    const featuredItem = category.items.find(i => i.featured);

    return (
      <div
        key={category.id}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* LEFT: Menu */}
        <MenuSection
          title={category.title}
          items={category.items}
        />

        {/* RIGHT: Featured image */}
        {featuredItem?.image && (
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={featuredItem.image}
                alt={featuredItem.name}
                className="w-80 h-80 object-cover rounded-3xl shadow-2xl"
              />

              {featuredItem.offerPrice && (
                <span className="
                  absolute bottom-4 right-4
                  rounded-full bg-orange-500
                  px-4 py-1 text-sm font-semibold
                ">
                  ${featuredItem.offerPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

        </div>

      </div>
    </section>
  );
}

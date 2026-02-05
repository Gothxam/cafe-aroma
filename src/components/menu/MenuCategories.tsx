"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import MenuItemCard from "../../components/menu/MenuItemCard";

const menuData :any= {
  Coffee: [
    {
      name: "Cappuccino",
      description: "Rich espresso topped with steamed milk foam.",
      price: "₹180",
      isVeg: true,
    },
    {
      name: "Latte",
      description: "Smooth espresso with creamy milk.",
      price: "₹200",
      isVeg: true,
    },
    {
      name: "Cappuccino",
      description: "Rich espresso topped with steamed milk foam.",
      price: "₹180",
      isVeg: true,
    },
    {
      name: "Latte",
      description: "Smooth espresso with creamy milk.",
      price: "₹200",
      isVeg: true,
    },
    {
      name: "Cappuccino",
      description: "Rich espresso topped with steamed milk foam.",
      price: "₹180",
      isVeg: true,
    },
    {
      name: "Latte",
      description: "Smooth espresso with creamy milk.",
      price: "₹200",
      isVeg: true,
    },
    {
      name: "Cappuccino",
      description: "Rich espresso topped with steamed milk foam.",
      price: "₹180",
      isVeg: true,
    },
    {
      name: "Latte",
      description: "Smooth espresso with creamy milk.",
      price: "₹200",
      isVeg: true,
    },
  ],
  Food: [
    {
      name: "Grilled Sandwich",
      description: "Loaded with veggies, cheese, and house sauce.",
      price: "₹220",
      isVeg: true,
    },
    {
      name: "Pasta Alfredo",
      description: "Creamy Alfredo sauce with herbs and parmesan.",
      price: "₹320",
      isVeg: true,
    },
  ],
  Desserts: [
    {
      name: "Chocolate Brownie",
      description: "Warm brownie served with chocolate drizzle.",
      price: "₹150",
      isVeg: true,
    },
    {
      name: "Cheesecake",
      description: "Classic creamy cheesecake with a biscuit base.",
      price: "₹260",
      isVeg: true,
    },
  ],
};

const categories = Object.keys(menuData);

export default function MenuCategories() {
  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      {/* Category Tabs */}
      <div className="flex justify-center">
        <TabsList className="flex flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Items */}
      {categories.map((category) => (
        <TabsContent key={category} value={category}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuData[category].map((item:any) => (
              <MenuItemCard key={item.name} {...item} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

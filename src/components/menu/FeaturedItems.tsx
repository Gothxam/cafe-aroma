import { MenuCategory } from "../../../data/menu";

interface Props {
  menuData: MenuCategory[];
}

export default function FeaturedItems({ menuData }: Props) {
  return (
    <div className="flex flex-col gap-24">
      {menuData.map((category) => {
        const featuredItem = category.items.find(
          (item) => item.featured
        );

        if (!featuredItem || !featuredItem.image) return null;

        return (
          <div
            key={category.id}
            className="
              flex items-center justify-center
              min-h-[400px]
              relative
            "
          >
            <img
              src={featuredItem.image}
              alt={featuredItem.name}
              className="
                w-72 h-72
                object-cover
                rounded-2xl
                shadow-2xl
              "
            />

            {featuredItem.offerPrice && (
              <span className="
                absolute bottom-6 right-6
                rounded-full bg-orange-500
                px-4 py-1 text-sm font-semibold
              ">
                ${featuredItem.offerPrice.toFixed(2)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

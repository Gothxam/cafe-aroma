import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Coffee } from "lucide-react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  isVeg?: boolean;
  image?: string;
};

export default function MenuItemCard({
  name,
  description,
  price,
  isVeg = true,
}: MenuItem) {
  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-white/10 bg-white/5 backdrop-blur-md">
      {/* Image placeholder with icon */}
      <div className="h-48 bg-gradient-to-br from-coffee-bean/20 to-camel/20 flex items-center justify-center relative overflow-hidden">
        <Coffee className="w-16 h-16 text-coffee-bean/40 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-almond-cream group-hover:text-camel transition-colors">{name}</h3>
          <span className="font-black text-camel shrink-0">{price}</span>
        </div>

        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <Badge className="bg-camel/20 text-camel border-camel/20 hover:bg-camel/30">
            {isVeg ? "VEG" : "NON-VEG"}
          </Badge>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs text-white">+</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

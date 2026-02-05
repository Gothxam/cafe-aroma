import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

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
    <Card className="group overflow-hidden transition hover:shadow-md">
      {/* Image placeholder */}
      <div className="h-40 bg-muted flex items-center justify-center text-sm text-muted-foreground">
        Image
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">{name}</h3>
          <span className="font-medium text-primary">{price}</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="mt-3">
          <Badge variant="secondary">
            {isVeg ? "Veg" : "Non-Veg"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

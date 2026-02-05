import { Card, CardContent } from "../../components/ui/card";

type Review = {
  name: string;
  comment: string;
  rating: number;
};

export default function ReviewCard({ name, comment, rating }: Review) {
  return (
    <Card className="h-full">
      <CardContent className="p-5">
        {/* Stars */}
        <div className="mb-3 text-sm text-primary">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>

        <p className="text-sm text-muted-foreground">
          “{comment}”
        </p>

        <p className="mt-4 text-sm font-medium text-foreground">
          — {name}
        </p>
      </CardContent>
    </Card>
  );
}

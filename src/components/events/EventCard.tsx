import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

type Event = {
  title: string;
  date: string;
  description: string;
};

export default function EventCard({ title, date, description }: Event) {
  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="p-5">
        <Badge variant="secondary" className="mb-3">
          {date}
        </Badge>

        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

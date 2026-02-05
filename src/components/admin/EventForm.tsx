import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function EventForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Event title" />
      <Input placeholder="Date / Time" />
      <Input placeholder="Image URL" />
      <Input placeholder="Description" />

      <Button>Save Event</Button>
    </form>
  );
}

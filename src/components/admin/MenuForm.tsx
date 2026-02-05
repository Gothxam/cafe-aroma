import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function MenuForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Item name" />
      <Input placeholder="Category" />
      <Input placeholder="Price" />
      <Input placeholder="Image URL" />

      <Button>Save Item</Button>
    </form>
  );
}

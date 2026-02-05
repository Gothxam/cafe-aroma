import EventCard from "../../components/events/EventCard";

const events = [
  {
    title: "Live Acoustic Night",
    date: "Friday • 7 PM",
    description:
      "Enjoy a relaxing evening with live acoustic music and great coffee.",
  },
  {
    title: "Weekend Brunch Special",
    date: "Saturday & Sunday",
    description:
      "Special brunch menu curated by our chef, available every weekend.",
  },
  {
    title: "Coffee Tasting Session",
    date: "Next Wednesday • 5 PM",
    description:
      "Explore different coffee blends and learn brewing techniques.",
  },
];

export default function EventList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.title} {...event} />
      ))}
    </div>
  );
}

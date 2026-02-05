import EventList from "../../components/events/EventList";

export default function EventsPage() {
  return (
    <section className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/events/events-bg.jpg')",
      }}>
      <div className="min-h-screen bg-camel/20 backdrop-blur-[0px]">

        <div className="mx-auto max-w-7xl px-4 py-20">

          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-almond-cream">
              Events & Specials
            </h1>
            <p className="mt-4 text-almond-cream max-w-2xl mx-auto">
              From live music to exclusive food specials, there’s always something
              happening at our café.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-20">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Upcoming Events
            </h2>
            <EventList />
          </div>

          {/* Optional: Past Events (later) */}
          <div className="rounded-xl bg-muted/40 p-10 text-center">
            <h3 className="text-xl font-semibold text-foreground">
              Missed an Event?
            </h3>
            <p className="mt-3 text-muted-foreground">
              Follow us on social media to stay updated on upcoming events and
              special announcements.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}

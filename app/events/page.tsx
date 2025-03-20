import prisma from "@/lib/db";
import Link from "next/link";
import EventCard from "./EventCard";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <h2 className="md:col-span-1 text-2xl font-bold">Upcoming Events</h2>
          <div className="md:col-span-4">
            {/* Content for the second section that takes 2 columns */}
            <div className="w-full">
              {events
                .filter((event) => new Date(event.startDate) > new Date())
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-4 border-t-2 border-t-amber-500">
          <h2 className="md:col-span-1 text-2xl font-bold">Past Events</h2>
          <div className="md:col-span-4">
            {/* Content for the second section that takes 2 columns */}
            <div className="w-full">
              {events
                .filter((event) => new Date(event.startDate) < new Date())
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>
        </div>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg">No events found.</p>
        </div>
      )}
    </div>
  );
}

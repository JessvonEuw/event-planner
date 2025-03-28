import Link from "next/link";
import { Event, Guest } from "@prisma/client";

interface EventWithGuests extends Event {
  guests: Guest[];
}

// Helper function to format dates
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export default function EventCard({ event }: { event: EventWithGuests }) {
  return (
    <div
      key={event.id}
      className="bg-black/[.05] dark:bg-white/[.06] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <div className="bg-foreground text-xs px-2 py-1 rounded-full">
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>
        </div>

        <p className="text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-medium hover:underline"
          >
            View Details →
          </Link>
          <Link
            href={`/events/${event.slug}/edit`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Edit Event
          </Link>
        </div>
      </div>
    </div>
  );
}

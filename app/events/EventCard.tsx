import Link from "next/link";
import { Prisma } from "@prisma/client";

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

export default function EventCard({
  event,
}: {
  event: Prisma.EventCreateInput;
}) {
  return (
    <div
      key={event.id}
      className="bg-black/[.05] dark:bg-white/[.06] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <div className="bg-foreground text-xs px-2 py-1 rounded-full">
            {new Date(event.startDate) > new Date() ? "Upcoming" : "Past"}
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">
              {formatDate(event.startDate)}
              {event.endDate &&
                formatDate(event.endDate) !== formatDate(event.startDate) &&
                ` - ${formatDate(event.endDate)}`}
            </span>
          </div>

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

          {event.notes && (
            <div className="flex items-start mt-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm line-clamp-1">{event.notes}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-medium hover:underline"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

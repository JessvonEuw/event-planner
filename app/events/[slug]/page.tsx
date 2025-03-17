import prisma from "@/lib/db";
import Link from "next/link";

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

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: {
      slug,
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event?.title}</h1>
        <Link
          href="/events"
          className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Back to Events
        </Link>
      </div>

      <div className="bg-white dark:bg-black/[.05] rounded-lg overflow-hidden shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold">{event?.title}</h2>
          <div className="bg-foreground text-background text-xs px-3 py-1 rounded-full">
            {event?.date && new Date(event.date) > new Date()
              ? "Upcoming"
              : "Past"}
          </div>
        </div>

        <p className="text-lg mb-8">{event?.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0"
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
              <span className="text-md">
                {event?.date && formatDate(event.date)}
              </span>
            </div>

            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0"
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
              <span className="text-md">{event?.location}</span>
            </div>
          </div>

          {event?.notes && (
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0"
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
              <div>
                <h3 className="font-medium mb-2">Notes:</h3>
                <p className="text-md">{event?.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* We'll keep this link but it's redundant since we're already on the event page */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/events/${event?.slug}/guests`}
            className="inline-block px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
          >
            View Guest List →
          </Link>
        </div>
      </div>
    </div>
  );
}

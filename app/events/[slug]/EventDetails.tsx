'use client';

import Link from "next/link";

interface EventWithGuests {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  notes: string | null;
  slug: string;
  guests: {
    name: string;
    email: string | null;
  }[];
}

// Helper function to format dates
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventDetails({ event, slug }: { event: EventWithGuests; slug: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <Link
          href="/events"
          className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Back to Events
        </Link>
      </div>

      <div className="bg-black/[.05] rounded-lg overflow-hidden shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <div className="bg-foreground text-background text-xs px-3 py-1 rounded-full">
            {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
          </div>
        </div>

        <p className="text-lg mb-8">{event.description}</p>

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
              <span className="text-md">{formatDate(event.date)}</span>
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
              <span className="text-md">{event.location}</span>
            </div>
          </div>

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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <span className="text-md block mb-2">Guests ({event.guests.length})</span>
                <div className="space-y-1">
                  {event.guests.map((guest, index) => (
                    <div key={index} className="text-sm">
                      {guest.name} {guest.email && `<${guest.email}>`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {event.notes && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-gray-400">{event.notes}</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link
            href={`/events/${slug}/edit`}
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity inline-block"
          >
            Edit Event Details
          </Link>
          <Link
            href={`/events/${slug}/edit/guests`}
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity inline-block"
          >
            Edit Guests
          </Link>
        </div>
      </div>
    </div>
  );
} 
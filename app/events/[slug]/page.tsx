import { createEvent } from "@/actions/actions";
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
    include: {
      guests: true,
    },
  });

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Event Not Found</h1>
          <Link
            href="/events"
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Back to Events
          </Link>
        </div>
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-md">
          The event you&apos;re looking for could not be found.
        </div>
      </div>
    );
  }

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

      <div className="bg-white dark:bg-black/[.05] rounded-lg overflow-hidden shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <div className="bg-foreground text-background text-xs px-3 py-1 rounded-full">
            {new Date(event.startDate) > new Date() ? "Upcoming" : "Past"}
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
              <span className="text-md">
                {formatDate(event.startDate)}
                {event.endDate &&
                  formatDate(event.endDate) !== formatDate(event.startDate) && (
                    <span className="block mt-1">
                      to {formatDate(event.endDate)}
                    </span>
                  )}
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
              <span className="text-md">{event.location}</span>
            </div>
          </div>

          {event.notes && (
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
                <p className="text-md">{event.notes}</p>
              </div>
            </div>
          )}
        </div>

        {event.guests && event.guests.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Guest List ({event.guests.length})
            </h3>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {event.guests.map((guest) => (
                    <tr key={guest.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium">{guest.name}</div>
                        {guest.email && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {guest.email}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            guest.attending
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {guest.attending ? "Attending" : "Not Attending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">{guest.notes || "-"}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* We'll keep this link but modify it to be more meaningful */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/events"
            className="inline-block px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
          >
            Back to Events
          </Link>
        </div>
      </div>

      <form
        action={createEvent}
        className="flex flex-col gap-6 text-white bg-gray-50 dark:bg-gray-800 p-8 max-w-4xl mx-auto rounded-lg shadow-md mt-8"
      >
        <div className="mb-2">
          <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter event title"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter event description"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location" className="text-sm font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter event location"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="text-sm font-medium mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            placeholder="Additional information about the event"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

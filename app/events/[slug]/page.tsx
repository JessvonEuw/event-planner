import prisma from "@/lib/db";
import Link from "next/link";
import EventForm from '@/app/components/EventForm';
import GuestForm from '@/app/components/GuestForm';
import { deleteEvent } from "@/app/events/actions";

async function getEvent(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { guests: true },
  });
}

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

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
        <div className="flex gap-2">
          <form action={deleteEvent.bind(null, params.slug)} className="inline">
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={(e) => {
                if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
                  e.preventDefault();
                }
              }}
            >
              Delete Event
            </button>
          </form>
          <Link
            href="/events"
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Back to Events
          </Link>
        </div>
      </div>

      <EventForm
        onSubmit={async () => {
          'use server';
          // TODO: Implement event update
        }}
        initialData={{
          title: event.title,
          description: event.description || '',
          date: new Date(event.date).toISOString().split('T')[0],
          location: event.location,
          notes: event.notes || '',
        }}
      />

      <GuestForm
        onSubmit={async () => {
          'use server';
          // TODO: Implement guests update
        }}
        onBack={() => {}}
        initialGuests={event.guests.map(guest => ({
          name: guest.name,
          email: guest.email || '',
        }))}
      />
    </div>
  );
}

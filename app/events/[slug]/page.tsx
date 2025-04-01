import prisma from "@/lib/db";
import Link from "next/link";
import EventEdit from './EventEdit';
import EventActions from './EventActions';

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
  const loadedParams = await params;
  const event = await getEvent(loadedParams.slug);

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
        <EventActions slug={loadedParams.slug} />
      </div>

      <EventEdit event={event} slug={loadedParams.slug} />
    </div>
  );
}

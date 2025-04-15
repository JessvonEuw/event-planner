import prisma from "@/lib/db";
import EventDetails from './EventDetails';

async function getEvent(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { 
      guests: true,
      userEvents: {
        include: {
          user: true
        }
      }
    },
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Event Not Found</h1>
        </div>
        <div className="bg-red-900 text-red-200 p-4 rounded-md">
          The event you&apos;re looking for could not be found.
        </div>
      </div>
    );
  }

  return (
    <EventDetails event={event} slug={slug} />
  );
}

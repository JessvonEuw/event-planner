import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import EventFormWrapper from "./EventFormWrapper";
import EventFlowLayout from "@/app/components/EventFlowLayout";

async function getEvent(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { guests: true },
  });
}

export default async function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <EventFlowLayout slug={params.slug} currentStep="details">
      <EventFormWrapper
        initialData={{
          title: event.title,
          description: event.description || '',
          date: new Date(event.date).toISOString().split('T')[0],
          location: event.location,
          notes: event.notes || '',
        }}
        slug={params.slug}
        guests={event.guests}
      />
    </EventFlowLayout>
  );
}

import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import GuestFormWrapper from "./GuestFormWrapper";
import EventFlowLayout from "@/app/components/EventFlowLayout";

async function getEvent(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: { guests: true },
  });
}

export default async function EditGuestsPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <EventFlowLayout slug={params.slug} currentStep="guests">
      <GuestFormWrapper
        initialGuests={event.guests.map(guest => ({
          name: guest.name,
          email: guest.email || '',
        }))}
        slug={params.slug}
        eventDetails={{
          title: event.title,
          description: event.description || '',
          date: new Date(event.date).toISOString().split('T')[0],
          location: event.location,
          notes: event.notes || '',
        }}
      />
    </EventFlowLayout>
  );
} 
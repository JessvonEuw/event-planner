'use client';

import { useUpdateEvent } from "@/hooks/useEvents";
import EventForm from "@/app/components/EventForm";

interface EventFormWrapperProps {
  initialData: {
    title: string;
    description: string;
    date: string;
    location: string;
    notes: string;
  };
  slug: string;
  guests: {
    name: string;
    email: string | null;
  }[];
}

export default function EventFormWrapper({ initialData, slug, guests }: EventFormWrapperProps) {
  const updateEvent = useUpdateEvent(slug);

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateEvent.mutateAsync({
        ...data,
        guests: guests.map(guest => ({
          name: guest.name,
          email: guest.email || '',
        })),
      });
      window.location.href = `/events/${slug}`;
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <EventForm
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
} 
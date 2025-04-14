'use client';

import { useUpdateEvent } from "@/hooks/useEvents";
import GuestForm from "@/app/components/GuestForm";

interface GuestFormWrapperProps {
  initialGuests: {
    name: string;
    email: string;
  }[];
  slug: string;
  eventDetails: {
    title: string;
    description: string;
    date: string;
    location: string;
    notes: string;
  };
}

export default function GuestFormWrapper({ initialGuests, slug, eventDetails }: GuestFormWrapperProps) {
  const updateEvent = useUpdateEvent(slug);

  const handleSubmit = async (guests: typeof initialGuests) => {
    try {
      await updateEvent.mutateAsync({
        ...eventDetails,
        guests,
      });
      window.location.href = `/events/${slug}`;
    } catch (error) {
      console.error('Error updating guests:', error);
    }
  };

  return (
    <GuestForm
      initialGuests={initialGuests}
      onSubmit={handleSubmit}
      onBack={() => {
        window.location.href = `/events/${slug}`;
      }}
    />
  );
} 
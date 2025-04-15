'use client';

import { useState } from 'react';
import EventForm from '@/app/components/EventForm';
import GuestForm from '@/app/components/GuestForm';
import { useUpdateEvent } from '@/hooks/useEvents';

type EventDetails = {
  title: string;
  description: string;
  date: string;
  location: string;
  notes: string;
};

type Guest = {
  name: string;
  email: string;
};

interface EventWithGuests {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  notes: string | null;
  guests: {
    name: string;
    email: string | null;
  }[];
}

export default function EventEdit({ event, slug }: { event: EventWithGuests; slug: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    title: event.title,
    description: event.description || '',
    date: new Date(event.date).toISOString().split('T')[0],
    location: event.location,
    notes: event.notes || '',
  });
  const initialGuests = event.guests.map(guest => ({
    name: guest.name,
    email: guest.email || '',
  }));

  const updateEvent = useUpdateEvent(slug);

  const handleEventDetailsSubmit = (details: EventDetails) => {
    setEventDetails(details);
    setCurrentStep(2);
  };

  const handleGuestsSubmit = async (updatedGuests: Guest[]) => {
    try {
      await updateEvent.mutateAsync({
        ...eventDetails,
        guests: updatedGuests,
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <>
      {currentStep === 1 ? (
        <EventForm
          onSubmit={handleEventDetailsSubmit}
          initialData={eventDetails}
        />
      ) : (
        <GuestForm
          onSubmit={handleGuestsSubmit}
          onBack={() => setCurrentStep(1)}
          initialGuests={initialGuests}
        />
      )}
    </>
  );
} 
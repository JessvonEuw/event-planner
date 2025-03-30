"use client";
import { useState, useEffect } from 'react';
import EventForm from '@/app/components/EventForm';
import GuestForm from '@/app/components/GuestForm';
import LinkButton from '@/app/components/LinkButton';
import { useEvent, useUpdateEvent } from '@/hooks/useEvents';

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

export default function EventEditForm({ params }: { params: { slug: string } }) {
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  
  const { data: event, isLoading, error: fetchError } = useEvent(params.slug);
  const updateEvent = useUpdateEvent(params.slug);

  useEffect(() => {
    if (event) {
      const formattedDate = new Date(event.date).toISOString().split('T')[0];
      
      setEventDetails({
        title: event.title,
        description: event.description || '',
        date: formattedDate,
        location: event.location,
        notes: event.notes || '',
      });
      setGuests(event.guests.map(guest => ({
        name: guest.name,
        email: guest.email || '',
      })));
    }
  }, [event]);

  const handleEventDetailsSubmit = (details: EventDetails) => {
    setEventDetails(details);
    setCurrentStep(2);
  };

  const handleGuestsSubmit = async (updatedGuests: Guest[]) => {
    if (!eventDetails) return;

    try {
      await updateEvent.mutateAsync({
        ...eventDetails,
        guests: updatedGuests,
      });
      setSuccess(true);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <p className="text-red-600">Failed to load event details</p>
        <LinkButton href="/events">Back to Events</LinkButton>
      </div>
    );
  }

  return (
    <div>
      {success ? (
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
          <h1 className="text-2xl font-bold">Event updated successfully</h1>
          <div className="flex flex-col gap-2">
            <LinkButton href="/events" onClick={() => setSuccess(false)}>Back to Events</LinkButton>
          </div>
        </div>
      ) : (
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
              initialGuests={guests}
            />
          )}
        </>
      )}
    </div>
  );
}

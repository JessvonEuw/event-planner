"use client";
import { useState, useEffect } from 'react';
import EventForm from '@/app/components/EventForm';
import GuestForm from '@/app/components/GuestForm';
import LinkButton from '@/app/components/LinkButton';

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

type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  notes: string;
  guests: Guest[];
};

export default function EventEditForm({ params }: { params: { slug: string } }) {
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const event: Event = await response.json();
        
        // Format the date to YYYY-MM-DD for the date input
        const formattedDate = new Date(event.date).toISOString().split('T')[0];
        
        setEventDetails({
          title: event.title,
          description: event.description || '',
          date: formattedDate,
          location: event.location,
          notes: event.notes || '',
        });
        setGuests(event.guests);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [params.slug]);

  const handleEventDetailsSubmit = (details: EventDetails) => {
    setEventDetails(details);
    setCurrentStep(2);
  };

  const handleGuestsSubmit = async (updatedGuests: Guest[]) => {
    if (!eventDetails) return;

    const formData = new FormData();
    Object.entries(eventDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('guests', JSON.stringify(updatedGuests));

    try {
      const response = await fetch(`/api/events/${params.slug}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        throw new Error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <p className="text-red-600">{error}</p>
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

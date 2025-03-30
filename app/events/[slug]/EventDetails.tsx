'use client';

import { useState } from 'react';
import Link from "next/link";
import Button from '@/app/components/Button';
import EventForm from '@/app/components/EventForm';
import GuestForm from '@/app/components/GuestForm';
import { useUpdateEvent, useDeleteEvent } from '@/hooks/useEvents';

interface EventWithGuests {
  id: string;
  title: string;
  description: string | null;
  date: Date;
  location: string;
  notes: string | null;
  slug: string;
  guests: {
    name: string;
    email: string | null;
  }[];
}

// Helper function to format dates
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventDetails({ event, slug }: { event: EventWithGuests; slug: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const updateEvent = useUpdateEvent(slug);
  const deleteEvent = useDeleteEvent();

  const handleEventUpdate = async (data: {
    title: string;
    description: string;
    date: string;
    location: string;
    notes: string;
  }) => {
    try {
      await updateEvent.mutateAsync({
        ...data,
        guests: event.guests.map(guest => ({
          name: guest.name,
          email: guest.email || '',
        })),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleGuestsUpdate = async (guests: { name: string; email: string }[]) => {
    try {
      await updateEvent.mutateAsync({
        title: event.title,
        description: event.description || '',
        date: new Date(event.date).toISOString().split('T')[0],
        location: event.location,
        notes: event.notes || '',
        guests,
      });
      setIsEditingGuests(false);
    } catch (error) {
      console.error('Error updating guests:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteEvent.mutateAsync(slug);
      window.location.href = '/events';
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (isEditing) {
    return (
      <EventForm
        onSubmit={handleEventUpdate}
        initialData={{
          title: event.title,
          description: event.description || '',
          date: new Date(event.date).toISOString().split('T')[0],
          location: event.location,
          notes: event.notes || '',
        }}
      />
    );
  }

  if (isEditingGuests) {
    return (
      <GuestForm
        onSubmit={handleGuestsUpdate}
        onBack={() => setIsEditingGuests(false)}
        initialGuests={event.guests.map(guest => ({
          name: guest.name,
          email: guest.email || '',
        }))}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Event
          </Button>
          <Link
            href="/events"
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Back to Events
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-black/[.05] rounded-lg overflow-hidden shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <div className="bg-foreground text-background text-xs px-3 py-1 rounded-full">
            {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
          </div>
        </div>

        <p className="text-lg mb-8">{event.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-md">{formatDate(event.date)}</span>
            </div>

            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-md">{event.location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <span className="text-md block mb-2">Guests ({event.guests.length})</span>
                <div className="space-y-1">
                  {event.guests.map((guest, index) => (
                    <div key={index} className="text-sm">
                      {guest.name} {guest.email && `<${guest.email}>`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {event.notes && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-gray-600 dark:text-gray-400">{event.notes}</p>
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Edit Event Details
          </Button>
          <Button
            onClick={() => setIsEditingGuests(true)}
            className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Edit Guests
          </Button>
        </div>
      </div>
    </div>
  );
} 
"use client";
import { useState } from 'react';
import CreateForm from './CreateForm';
import GuestForm from './GuestForm';
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
};

export default function EventCreateForm() {
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [createdEvent, setCreatedEvent] = useState<Event | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEventDetailsSubmit = (details: EventDetails) => {
    setEventDetails(details);
    setCurrentStep(2);
  };

  const handleGuestsSubmit = async (guests: Guest[]) => {
    if (!eventDetails) return;

    const formData = new FormData();
    Object.entries(eventDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('guests', JSON.stringify(guests));

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const event = await response.json();
        setCreatedEvent(event);
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleCopyLink = async () => {
    if (!createdEvent) return;
    
    const eventUrl = `${window.location.origin}/events/${createdEvent.slug}`;
    await navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {success ? (
        <div className="flex flex-col items-center justify-center gap-4 h-screen">
          <h1 className="text-2xl font-bold">Event created successfully</h1>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {copied ? 'Link copied!' : 'Share event link'}
            </button>
            <LinkButton href="/events" onClick={() => setSuccess(false)}>See your events</LinkButton>
            <LinkButton href="/events/create" onClick={() => setSuccess(false)}>Create another event</LinkButton>
          </div>
        </div>
      ) : (
        <>
          {currentStep === 1 ? (
            <CreateForm onSubmit={handleEventDetailsSubmit} />
          ) : (
            <GuestForm
              onSubmit={handleGuestsSubmit}
              onBack={() => setCurrentStep(1)}
            />
          )}
        </>
      )}
    </div>
  );
}

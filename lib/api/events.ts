import { Event, Guest } from '@prisma/client';

export interface EventWithGuests extends Event {
  guests: Guest[];
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  notes: string;
  guests?: { name: string; email: string }[];
}

// API functions
export default async function fetchEvents(): Promise<EventWithGuests[]> {
  const response = await fetch('/api/events');
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

export async function fetchEvent(slug: string): Promise<EventWithGuests> {
  const response = await fetch(`/api/events/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch event');
  return response.json();
}

export async function createEvent(data: EventFormData): Promise<Event> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'guests') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  const response = await fetch('/api/events', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to create event');
  return response.json();
}

export async function updateEvent(slug: string, data: EventFormData): Promise<Event> {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'guests') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  const response = await fetch(`/api/events/${slug}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to update event');
  return response.json();
}

export async function deleteEvent(slug: string): Promise<void> {
  const response = await fetch(`/api/events/${slug}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete event');
}
import { useQuery } from "@tanstack/react-query";
import { Event } from "@prisma/client";

interface EventWithGuests extends Event {
  guests: any[]; // Replace 'any' with your Guest type
}

async function fetchEvents(): Promise<EventWithGuests[]> {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return response.json();
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}

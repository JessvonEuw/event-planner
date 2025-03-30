import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@prisma/client";
import { fetchEvent, createEvent, updateEvent, deleteEvent } from "@/lib/api/events";

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

// React Query hooks
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ['events', slug],
    queryFn: () => fetchEvent(slug),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useUpdateEvent(slug: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => updateEvent(slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', slug] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
} 

'use client';

import Link from "next/link";
import { useDeleteEvent } from "@/hooks/useEvents";

export default function EventActions({ slug }: { slug: string }) {
  const deleteEvent = useDeleteEvent();

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

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Delete Event
      </button>
      <Link
        href="/events"
        className="px-4 py-2 bg-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        Back to Events
      </Link>
    </div>
  );
} 
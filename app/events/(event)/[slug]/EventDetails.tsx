'use client';

import { EventWithGuests } from "@/lib/api/events";
import { Calendar, MapPin, Users, Trash2 } from "lucide-react";
import LinkButton from '@/app/components/LinkButton';
import Pill from "@/app/components/Pill";
import { deleteEvent } from "@/lib/api/events";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

// Helper function to format dates
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventDetails({ 
  event, 
  slug,
}: { 
  event: EventWithGuests; 
  slug: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: currentUser } = useUser();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteEvent(slug);
      router.push('/events');
      router.refresh();
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const isEventCreator = currentUser && event.userEvents.some(
    userEvent => userEvent.user.id === currentUser.id && userEvent.role === 'CREATOR'
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg p-8 max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-4 border-b pb-4">
        <h2 className="text-2xl font-bold text-primary">{event.title}</h2>
        <Pill isActive={new Date(event.date) > new Date()}>
          {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
        </Pill>
      </div>

      <p className="text-lg mb-4 leading-relaxed">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar size={20} className="text-primary" />
            <span className="text-md font-medium">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-primary" />
            <span className="text-md font-medium">{event.location}</span>
          </div>
        </div>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <Users size={20} className="text-primary mt-1" />
            <div className="flex-1">
              <span className="text-md font-medium block mb-2">Guests ({event.guests.length})</span>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {event.guests.map((guest, index) => (
                  <div key={index} className="text-sm bg-white p-2 rounded border border-gray-100">
                    <span className="font-medium">{guest.name}</span> {guest.email && <span className="text-gray-500">&lt;{guest.email}&gt;</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {event.notes && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <p className="text-gray-600 whitespace-pre-line">{event.notes}</p>
        </div>
      )}

      {isEventCreator && (
        <div className="flex justify-between gap-4 border-t mt-6 pt-6">
          <div className="flex gap-4">
            <LinkButton
              href={`/events/${slug}/edit`}
              variant="regular"
            >
              Edit Event Details
            </LinkButton>
            <LinkButton
              href={`/events/${slug}/edit/guests`}
              variant="outline"
            >
              Edit Guests
            </LinkButton>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={18} />
            {isDeleting ? 'Deleting...' : 'Delete Event'}
          </button>
        </div>
      )}
    </div>
  );
} 
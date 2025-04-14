import { useEffect } from 'react';
import { Calendar, MapPin, X, Users } from 'lucide-react';
import { EventWithGuests } from "@/lib/api/events";
import LinkButton from '@/app/components/LinkButton';
import Pill from '@/app/components/Pill';
interface EventDetailsSidebarProps {
  event: EventWithGuests;
  onClose: () => void;
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

export default function EventDetailsSidebar({ event, onClose }: EventDetailsSidebarProps) {
  // Prevent scrolling on the body when sidebar is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-96 bg-primary/10 shadow-lg border-l border-gray-200 overflow-y-auto z-50 transform transition-transform duration-400 ease-in-out translate-x-0 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{event.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <Pill isActive={new Date(event.date) > new Date()}>
            {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
          </Pill>
          <p className="bg-primary/10 p-4 rounded-lg mb-4">{event.description}</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Calendar size={16} color="#337357" />
              <span className="text-md">{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} color="#337357" />
              <span className="text-md">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} color="#337357" />
              <span className="text-md">{event.guests.length} Guests</span>
            </div>
          </div>
        {event.notes && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2">Notes</h3>
            <p className="text-gray-500">{event.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          <LinkButton
            href={`/events/${event.slug}`}
            variant="regular"
            >
            View Full Details
          </LinkButton>
        </div>
      </div>
      </div>
    </>
  );
} 
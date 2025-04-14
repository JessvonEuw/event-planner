import { EventWithGuests } from "@/lib/api/events";
import { Calendar, MapPin, Users } from "lucide-react";
import Pill from "@/app/components/Pill";
interface EventCardProps {
  event: EventWithGuests;
  onClick: (event: EventWithGuests) => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      onClick={() => onClick(event)}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform transition-shadow duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex justify-between items-start p-6">
        <div>
          <div className="flex items-center text-sm gap-2 mb-2">
            <Calendar size={16} color="#337357" />
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold">{event.title}</h3>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {event.location}
            </div>

            <div className="flex items-center gap-1">
              <Users size={16} />
              {event.guests.length} guests
            </div>
          </div>
        </div>
      <div className="text-xs px-3 py-1 rounded-full">
        <Pill isActive={new Date(event.date) > new Date()}>
          {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
        </Pill>
      </div>
      </div>
    </div>
  );
}

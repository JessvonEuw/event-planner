"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { House, User } from 'lucide-react';
import EventCard from "./EventCard";
import Sidebar from "./Sidebar";
import FilterButton from '@/app/components/FilterButton';
import LinkButton from '@/app/components/LinkButton';
import NavLink from '@/app/components/NavLink';
import { useEvents } from "@/hooks/useEvents";
import { useUser } from "@/hooks/useUser";
import EventDetailsSidebar from './EventDetailsSidebar';
import { EventWithGuests } from '@/lib/api/events';
import Button from '../components/Button';

type FilterType = 'all' | 'upcoming' | 'past';
type SortType = 'name' | 'date-asc' | 'date-desc' | 'guests';

export default function EventsPage() {
  const filters = ['all', 'upcoming', 'past'];
  const router = useRouter();
  const { data: allEvents, isLoading: isLoadingEvents } = useEvents();
  const { data: user, isLoading: isLoadingUser } = useUser();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeSort, setActiveSort] = useState<SortType>('date-desc');
  const [selectedEvent, setSelectedEvent] = useState<EventWithGuests | null>(null);

  useEffect(() => {
    // Check authentication on component mount
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        });
        if (!response.ok) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const filteredEvents = allEvents?.filter((event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    switch (activeFilter) {
      case 'upcoming':
        return eventDate >= today;
      case 'past':
        return eventDate < today;
      default:
        return true;
    }
  });

  const sortedAndFilteredEvents = filteredEvents?.sort((a, b) => {
    switch (activeSort) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'guests':
        return b.guests.length - a.guests.length;
      default:
        return 0;
    }
  });

  const handleEventClick = (event: EventWithGuests) => {
    setSelectedEvent(event);
  };

  const handleCloseSidebar = () => {
    setSelectedEvent(null);
  };

  if (isLoadingEvents || isLoadingUser) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between min-w-4/6 min-h-screen">
      {/* Left Sidebar */}
      <Sidebar className="text-center">
        <LinkButton href="/events/create">
          New Event
        </LinkButton>
        <div className="flex flex-col justify-center items-center h-100 gap-2 mx-auto">
          <NavLink href="/events" icon={<House />}>All Events</NavLink>
          <NavLink href="/events/create" icon={<User />}>User Profile</NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-medium mb-2">Upcoming</h4>
          <div>
            {allEvents?.filter((event) => new Date(event.date) >= new Date())
              .slice(0, 2).map((event) => (
                <div
                key={event.id}
                className="p-2 bg-white/[.03] rounded"
                >
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
          <h4 className="text-sm font-medium mb-2">Event Statistics</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-white/[.03] rounded">
              <p className="text-sm text-gray-400">
                Total Events
              </p>
              <p className="font-medium">{allEvents?.length || 0}</p>
            </div>
            <div className="p-2 bg-white/[.03] rounded">
              <p className="text-sm text-gray-400">
                Upcoming
              </p>
              <p className="font-medium">{allEvents?.filter((event) => new Date(event.date) >= new Date()).length || 0}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium">{user?.name || 'Loading...'}</p>
          <p className="text-sm text-gray-400 mb-2">{user?.email || 'Loading...'}</p>
          <Button
            onClick={handleLogout}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className={`bg-black/[.05] flex-1 transition-all duration-300 p-6 ${selectedEvent ? 'mr-96' : ''}`}>
        <div className="p-4">
          <div className="flex flex-col justify-between mb-6">
            <h2 className="text-primary text-2xl font-bold mb-8">Events</h2>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  onClick={() => setActiveFilter(filter as FilterType)}
                  selected={activeFilter === filter}
                >
                  {filter}
                </FilterButton>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center px-1 mb-2 text-gray-500">
            {filteredEvents?.length === 0 ? (
              <p className="text-gray-500">No events found</p>
            ) : filteredEvents?.length === 1 ? (
              <div>{filteredEvents?.length} event</div>
            ) : (
              <div>{filteredEvents?.length} events</div>
            )}
            {filteredEvents?.length !== 0 && (
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as SortType)}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="date-desc">Date (next event first)</option>
              <option value="date-asc">Date (oldest event first)</option>
              <option value="name">Name</option>
                <option value="guests">Most Guests</option>
              </select>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedAndFilteredEvents?.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={handleEventClick}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Event Details Sidebar */}
      {selectedEvent && (
        <EventDetailsSidebar 
          event={selectedEvent} 
          onClose={handleCloseSidebar} 
        />
      )}
    </div>
  );
}

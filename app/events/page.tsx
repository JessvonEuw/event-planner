"use client";

import Image from "next/image";
import { Event, Guest } from "@prisma/client";
import { useState } from 'react';
import UserAvatar from "@/assets/random-user.jpg";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "./EventCard";
import Sidebar from "./Sidebar";
import LinkButton from '../components/LinkButton';

interface EventWithGuests extends Event {
  guests: Guest[];
}

type FilterType = 'all' | 'upcoming' | 'past';

export default function EventsPage() {
  const { data: allEvents, isLoading: isLoadingEvents } = useEvents();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredEvents = allEvents?.filter((event: EventWithGuests) => {
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

  if (isLoadingEvents) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-80 min-w-4/6">
      {/* Left Sidebar */}
      <Sidebar>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <LinkButton href="/events/create">
          New Event
        </LinkButton>
        <div>
          <h4 className="font-medium mb-2">Upcoming</h4>
          <div className="space-y-2">
            {allEvents?.filter((event: EventWithGuests) => new Date(event.date) >= new Date())
              .slice(0, 2).map((event: EventWithGuests) => (
                <div
                  key={event.id}
                  className="p-2 bg-black/[.03] dark:bg-white/[.03] rounded"
                >
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Event Statistics</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-black/[.03] dark:bg-white/[.03] rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Events
                </p>
                <p className="font-medium">{allEvents?.length || 0}</p>
              </div>
              <div className="p-2 bg-black/[.03] dark:bg-white/[.03] rounded">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upcoming
                </p>
                <p className="font-medium">{allEvents?.filter((event: EventWithGuests) => new Date(event.date) >= new Date()).length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg">
          <div className="flex flex-col justify-between mb-6">
            <h2 className="text-2xl font-bold">Events</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/[.03] dark:bg-white/[.03] hover:bg-black/[.06] dark:hover:bg-white/[.06]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('upcoming')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'upcoming'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/[.03] dark:bg-white/[.03] hover:bg-black/[.06] dark:hover:bg-white/[.06]'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveFilter('past')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'past'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/[.03] dark:bg-white/[.03] hover:bg-black/[.06] dark:hover:bg-white/[.06]'
                }`}
              >
                Past
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredEvents?.map((event: EventWithGuests) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <Sidebar>
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Image
            width={48}
            height={48}
            src={UserAvatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-sm">john.doe@example.com</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div>
            <h4 className="text-sm font-medium mb-2">Date Range</h4>
            <select className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600">
              <option>All</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Next 3 Months</option>
            </select>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Event Type</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Birthday</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Meeting</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Party</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Other</span>
              </label>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

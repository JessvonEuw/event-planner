"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import EventCard from "./EventCard";
import Sidebar from "./Sidebar";
import Button from '@/app/components/Button';
import LinkButton from '@/app/components/LinkButton';
import { useEvents } from "@/hooks/useEvents";
import UserAvatar from "@/assets/random-user.jpg";

type FilterType = 'all' | 'upcoming' | 'past';

export default function EventsPage() {
  const router = useRouter();
  const { data: allEvents, isLoading: isLoadingEvents } = useEvents();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

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
            {allEvents?.filter((event) => new Date(event.date) >= new Date())
              .slice(0, 2).map((event) => (
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
                <p className="font-medium">{allEvents?.filter((event) => new Date(event.date) >= new Date()).length || 0}</p>
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
              <Button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/[.03] dark:bg-white/[.03] hover:bg-black/[.06] dark:hover:bg-white/[.06]'
                }`}
              >
                All
              </Button>
              <Button
                onClick={() => setActiveFilter('upcoming')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'upcoming'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/[.03] dark:bg-white/[.03] hover:bg-black/[.06] dark:hover:bg-white/[.06]'
                }`}
              >
                Upcoming
              </Button>
              <Button
                onClick={() => setActiveFilter('past')}
                className={`px-4 py-2 rounded-md ${
                  activeFilter === 'past'
                    ? 'bg-amber-500 text-white'
                    : 'bg-black/[.03] dark:bg-white/[.03] hover:bg-black/[.06] dark:hover:bg-white/[.06]'
                }`}
              >
                Past
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <div className="w-64">
        <div className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={UserAvatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">john@example.com</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

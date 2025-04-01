"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { House, User } from 'lucide-react';
import EventCard from "./EventCard";
import Sidebar from "./Sidebar";
import Button from '@/app/components/Button';
import FilterButton from '@/app/components/FilterButton';
import LinkButton from '@/app/components/LinkButton';
import NavLink from '@/app/components/NavLink';
import { useEvents } from "@/hooks/useEvents";
import { useUser } from "@/hooks/useUser";
import UserAvatar from "@/assets/random-user.jpg";

type FilterType = 'all' | 'upcoming' | 'past';

export default function EventsPage() {
  const filters = ['all', 'upcoming', 'past'];
  const router = useRouter();
  const { data: allEvents, isLoading: isLoadingEvents } = useEvents();
  const { data: user } = useUser();
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
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen min-w-4/6">
      {/* Left Sidebar */}
      <Sidebar>
        <LinkButton href="/events/create">
          New Event
        </LinkButton>
        <div className="flex flex-col justify-center items-center h-100 gap-2 mx-auto">
          <NavLink href="/events" icon={<House />}>All Events</NavLink>
          <NavLink href="/events/create" icon={<User />}>User Profile</NavLink>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg">
          <div className="flex flex-col justify-between mb-6">
            <h2 className="text-2xl font-bold">Events</h2>
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
          <div className="grid grid-cols-1 gap-4">
            {filteredEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <Sidebar>
        <div className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={UserAvatar}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user?.name || 'Loading...'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email || 'Loading...'}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </Button>
        </div>
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
    </div>
  );
}

"use client";

import { useEvents } from "@/hooks/useEvents";
import { useUser } from "@/hooks/useUser";
import EventCard from "./EventCard";
import { Event, Guest } from "@prisma/client";
import Image from "next/image";
import UserAvatar from "@/assets/random-user.jpg";
import Sidebar from "./Sidebar";
import Link from 'next/link';

interface EventWithGuests extends Event {
  guests: Guest[];
}

export default function EventsPage() {
  const { data: allEvents, isLoading: isLoadingEvents } = useEvents();
  console.log(allEvents);
  const { data: user, isLoading: isLoadingUser } = useUser();

  // Filter upcoming events
  const upcomingEvents = allEvents?.filter(
    (event: EventWithGuests) => new Date(event.date) >= new Date()
  );

  // Filter past events
  const pastEvents = allEvents?.filter(
    (event: EventWithGuests) => new Date(event.date) < new Date()
  );

  if (isLoadingEvents || isLoadingUser) {
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
          <Link href="/events/create" className="bg-sage text-white px-4 py-2 rounded-md mb-4">
            New Event
          </Link>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm uppercase font-medium mb-2">Upcoming Soon</h4>
            <div className="space-y-2">
              {upcomingEvents?.slice(0, 2).map((event: EventWithGuests) => (
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
                <p className="font-medium">{allEvents?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1">
        <div className="space-y-6">
          <div className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 gap-4">
              {upcomingEvents?.map((event: EventWithGuests) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          <div className="bg-black/[.05] dark:bg-white/[.06] p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Past Events</h2>
            <div className="grid grid-cols-1 gap-4">
              {pastEvents?.map((event: EventWithGuests) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
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
            <h3 className="font-semibold text-lg">{user?.name}</h3>
            <p className="text-sm text-white">{user?.email}</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="space-y-4">
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
        </div>
      </Sidebar>
    </div>
  );
}

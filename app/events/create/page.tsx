import { createEvent } from "@/actions/actions";

export default async function EventCreate() {
  return (
    <form
      action={createEvent}
      className="flex flex-col gap-6 text-white bg-gray-50 dark:bg-gray-800 p-8 mx-auto rounded-lg shadow-md mt-8"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      </div>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium mb-1">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter event title"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium mb-1">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Enter event description"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium mb-1">
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="date" className="text-sm font-medium mb-1">
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="location" className="text-sm font-medium mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Enter event location"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="notes" className="text-sm font-medium mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          placeholder="Additional information about the event"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Event
      </button>
    </form>
  );
}

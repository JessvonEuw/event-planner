import { createEvent } from "@/app/events/actions";
import Input from '@/app/components/Input';

export default async function EventCreate() {
  return (
    <form
      action={createEvent}
      className="flex flex-col w-1/2 gap-6 p-10 mx-auto bg-white rounded-lg shadow-md mt-8"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      </div>
      <div className="flex flex-col">
        <Input
          id="title"
          label="Event Title"
          name="title"
          placeholder="Enter event title"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="description"
          label="Description"
          name="description"
          placeholder="Enter event description"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="date"
          label="Start Date"
          name="date"
          type="date"
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="location"
          label="Location"
          name="location"
          placeholder="Enter event location"
          type="text"
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
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
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

"use client";
import { useActionState, useEffect } from 'react';
import Input from '@/app/components/Input';
import { createEvent } from "@/app/events/actions";
import React from 'react';

type ActionState = {
  error?: string;
};

export default function CreateForm({ setSuccess }: { setSuccess: (success: boolean) => void }) {
  const [state, formAction] = useActionState<ActionState, FormData>(createEvent, { error: undefined });

  // Watch for state changes to detect success
  useEffect(() => {
    // Only trigger if we have a state change from the initial state
    if (state && !('error' in state)) {
      setSuccess(true);
    }
  }, [state, setSuccess]);

  return (
    <form
      action={formAction}
      className="flex flex-col w-1/2 gap-6 p-10 mx-auto bg-white rounded-lg shadow-md mt-8"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        {state?.error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {state.error}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <Input
          id="title"
          label="Event Title"
          name="title"
          placeholder="Enter event title"
          type="text"
          required
          aria-describedby={state?.error ? "title-error" : undefined}
          aria-invalid={state?.error ? "true" : "false"}
        />
        {state?.error && state.error.includes("title") && (
          <p id="title-error" className="mt-1 text-sm text-red-600">
            {state.error}
          </p>
        )}
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
          required
          aria-describedby={state?.error ? "date-error" : undefined}
          aria-invalid={state?.error ? "true" : "false"}
        />
        {state?.error && state.error.includes("date") && (
          <p id="date-error" className="mt-1 text-sm text-red-600">
            {state.error}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <Input
          id="location"
          label="Location"
          name="location"
          placeholder="Enter event location"
          type="text"
          required
          aria-describedby={state?.error ? "location-error" : undefined}
          aria-invalid={state?.error ? "true" : "false"}
        />
        {state?.error && state.error.includes("location") && (
          <p id="location-error" className="mt-1 text-sm text-red-600">
            {state.error}
          </p>
        )}
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
  )
}
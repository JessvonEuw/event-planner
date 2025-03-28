"use client";
import Input from '@/app/components/Input';
import React from 'react';

type EventDetails = {
  title: string;
  description: string;
  date: string;
  location: string;
  notes: string;
};

type CreateFormProps = {
  onSubmit: (details: EventDetails) => void;
};

export default function CreateForm({ onSubmit }: CreateFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const details: EventDetails = {
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      date: formData.get("date")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      notes: formData.get("notes")?.toString() || "",
    };

    onSubmit(details);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-1/2 gap-6 p-10 mx-auto bg-white rounded-lg shadow-md mt-8"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      </div>
      <div className="flex flex-col">
        <Input
          id="title"
          name="title"
          label="Event Title"
          placeholder="Enter event title"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="description"
          name="description"
          label="Description"
          placeholder="Enter event description"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="date"
          name="date"
          label="Start Date"
          type="date"
          required
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="location"
          name="location"
          label="Location"
          placeholder="Enter event location"
          type="text"
          required
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
        Next: Add Guests
      </button>
    </form>
  );
}
"use client";

import React, { useState } from 'react';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

type EventDetails = {
  title: string;
  description: string;
  date: string;
  location: string;
  notes: string;
};

type EventFormProps = {
  onSubmit: (details: EventDetails) => void;
  initialData?: EventDetails | null;
};

export default function EventForm({ onSubmit, initialData }: EventFormProps) {
  const [formData, setFormData] = useState<EventDetails>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    date: initialData?.date || '',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-1/2 gap-6 p-10 mx-auto bg-white rounded-lg shadow-md mt-8"
    >
      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Event' : 'Create New Event'}</h2>
      </div>
      <div className="flex flex-col">
        <Input
          id="title"
          name="title"
          label="Event Title"
          placeholder="Enter event title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="description"
          name="description"
          label="Description"
          placeholder="Enter event description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <Input
          id="date"
          name="date"
          label="Start Date"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
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
          value={formData.location}
          onChange={handleChange}
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
          value={formData.notes}
          onChange={handleChange}
        ></textarea>
      </div>
      <Button
        type="submit"
        className="mt-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {initialData ? 'Save Changes' : 'Next: Add Guests'}
      </Button>
    </form>
  );
}
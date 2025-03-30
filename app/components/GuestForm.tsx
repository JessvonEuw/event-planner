"use client";
import { useState } from 'react';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

type Guest = {
  name: string;
  email: string;
};

type GuestFormProps = {
  onSubmit: (guests: Guest[]) => void;
  onBack: () => void;
  initialGuests?: Guest[];
};

export default function GuestForm({ onSubmit, onBack, initialGuests = [] }: GuestFormProps) {
  const [guests, setGuests] = useState<Guest[]>(
    initialGuests.length > 0 ? initialGuests : [{ name: '', email: '' }]
  );

  const addGuest = () => {
    setGuests([...guests, { name: '', email: '' }]);
  };

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const newGuests = [...guests];
    newGuests[index] = { ...newGuests[index], [field]: value };
    setGuests(newGuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty guests
    const validGuests = guests.filter(guest => guest.name && guest.email);
    onSubmit(validGuests);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-6 p-10 mx-auto bg-white rounded-lg shadow-md mt-8">
      <div className="mb-2">
        <h2 className="text-2xl font-bold mb-4">Add Guests</h2>
      </div>

      {guests.map((guest, index) => (
        <div key={index} className="flex gap-4 items-start">
          <div className="flex-1">
            <Input
              id={`guest-name-${index}`}
              name={`guest-name-${index}`}
              label="Guest Name"
              value={guest.name}
              onChange={(e) => updateGuest(index, 'name', e.target.value)}
              placeholder="Enter guest name"
              type="text"
            />
          </div>
          <div className="flex-1">
            <Input
              id={`guest-email-${index}`}
              name={`guest-email-${index}`}
              label="Guest Email"
              value={guest.email}
              onChange={(e) => updateGuest(index, 'email', e.target.value)}
              placeholder="Enter guest email"
              type="email"
            />
          </div>
          {guests.length > 1 && (
            <Button
              type="button"
              onClick={() => removeGuest(index)}
              className="mt-6 px-3 py-2 text-red-600 hover:text-red-800"
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={addGuest}
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          + Add Guest
        </Button>
        <Button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialGuests.length > 0 ? 'Update Guests' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
} 
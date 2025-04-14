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
    <form onSubmit={handleSubmit} className="flex flex-col w-3/4 gap-4 p-10 mx-auto bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Guests</h2>

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
            <a
              onClick={() => removeGuest(index)}
              className="text-tertiary hover:text-primary cursor-pointer mt-6 px-3 py-2"
            >
              Remove
            </a>
          )}
        </div>
      ))}
      <a
        type="button"
        onClick={addGuest}
        className="text-tertiary hover:text-primary cursor-pointer"
      >
        + Add Guest
      </a>
      <div className="flex gap-4">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          {initialGuests.length > 0 ? 'Update Guests' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
} 
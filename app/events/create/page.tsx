"use client";
import { useState } from 'react';
import CreateForm from './CreateForm';
import LinkButton from '@/app/components/LinkButton';

export default function EventCreateForm() {
  const [success, setSuccess] = useState(false);
  console.log("success: ", success);

  return (
    <div>
      {success ? (
        <div className="flex flex-col items-center justify-center gap-2 h-screen">
          <h1>Event created successfully</h1>
          <LinkButton href="/events" onClick={() => setSuccess(false)}>See your events</LinkButton>
          <LinkButton href="/events/create" onClick={() => setSuccess(false)}>Create another event</LinkButton>
        </div>
      ) : (
        <CreateForm setSuccess={setSuccess} />
      )}
    </div>
  );
}

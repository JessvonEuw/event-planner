import Link from 'next/link';

export default function EventCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-purple/50 min-h-screen">
      <Link href="/events" className="text-white">Go Home</Link>
      <h1>Create Event</h1>
      {children}
    </div>
  );
}

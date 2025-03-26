import LinkButton from '@/app/components/LinkButton';
import Link from 'next/link';

export default function EventCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-purple/50 min-h-screen">
      <LinkButton href="/events">Go Home</LinkButton>
      {children}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface EventFlowLayoutProps {
  children: React.ReactNode;
  slug?: string;
  currentStep: 'details' | 'guests';
}

function EventFlowStep({ href, isActive, stepNumber, stepName }: { href: string, isActive: boolean, stepNumber: number, stepName: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center ${
        isActive
          ? 'text-primary font-semibold'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        {stepNumber}
      </div>
      {stepName}
    </Link>
  );
}

export default function EventFlowLayout({ children, slug, currentStep }: EventFlowLayoutProps) {
  const pathname = usePathname();
  const isEditFlow = pathname.includes('/edit');
  const basePath = isEditFlow ? `/events/${slug}/edit` : '/events/new';

  return (
    <div>
      {/* Main Content */}
      <div className="mx-auto">
        {/* Steps Navigation */}
        <div className="mb-8">
          <nav className="flex items-center justify-center">
            <div className="flex items-center">
              <EventFlowStep
                href={`${basePath}`}
                isActive={currentStep === 'details'}
                stepNumber={1}
                stepName="Event Details"
              />
              <div className="w-16 h-0.5 bg-gray-200 mx-2" />
              <EventFlowStep
                href={`${basePath}/guests`}
                isActive={currentStep === 'guests'}
                stepNumber={2}
                stepName="Guest List"
              />
            </div>
          </nav>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
} 
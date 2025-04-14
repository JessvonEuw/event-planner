import LinkButton from '@/app/components/LinkButton';
import { ArrowLeft } from 'lucide-react';

export default function CreateEventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/10 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-2 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <LinkButton href={"/events"} variant="outline">
              <ArrowLeft className="mr-2" size={20} />
                Back to Events
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-10">
        {children}
      </div>
    </div>
  );
}
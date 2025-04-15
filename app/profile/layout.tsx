import { ArrowLeft } from 'lucide-react';
import InternalHeader from '@/app/components/InternalHeader';
import LinkButton from '@/app/components/LinkButton';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/10 min-h-screen">
      <InternalHeader>
        <div className="flex items-center space-x-4">
          <LinkButton href={"/events"} variant="outline">
          <ArrowLeft className="mr-2" size={20} />
            Back to Events
          </LinkButton>
        </div>
      </InternalHeader>
      <div className="container mx-auto py-10">
        {children}
      </div>
    </div>
  );
}
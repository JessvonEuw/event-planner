import Image from 'next/image';
import LinkButton from './components/LinkButton';
import Logo from '@/public/plan-pulse.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary/10">
      <nav className="flex justify-between items-center bg-white p-4">
        <Image src={Logo} alt="Logo" width={150} />
        <div className="flex items-center gap-2">
          <LinkButton href="/login">Login</LinkButton>
          <LinkButton variant="outline" href="/register">Sign up</LinkButton>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Pulse
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8">
            Your Ultimate Event Planning Companion
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            Streamline your event planning process with our intuitive platform. 
            From small gatherings to large-scale events, Plan Pulse helps you 
            organize, manage, and execute your events flawlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <LinkButton href="/events">
              View Your Events
            </LinkButton>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Planning</h3>
            <p className="text-gray-600">Create and manage events with our intuitive interface.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Organization</h3>
            <p className="text-gray-600">Keep track of all your events in one place.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">Stay informed with instant notifications and changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

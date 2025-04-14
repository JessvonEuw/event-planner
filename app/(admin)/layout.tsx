import Image from 'next/image';
import LinkButton from '@/app/components/LinkButton';
import Logo from '@/public/plan-pulse.png';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-between items-center bg-transparent p-4">
        <Image src={Logo} alt="Logo" width={150} />
        <div className="flex items-center gap-2">
          <LinkButton href="/login">Login</LinkButton>
          <LinkButton variant="outline" href="/register">Sign up</LinkButton>
        </div>
      </nav>
      <main className="flex-grow h-full">
        {children}
      </main>
    </div>
  );
}
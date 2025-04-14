import Image from 'next/image';
import LinkButton from './LinkButton';
import Logo from '@/public/plan-pulse.png';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-transparent px-4 py-2">
      <Image src={Logo} alt="Logo" width={150} />
      <div className="flex items-center gap-2">
        <LinkButton href="/login">Login</LinkButton>
        <LinkButton variant="outline" href="/register">Sign up</LinkButton>
      </div>
    </nav>
  );
};
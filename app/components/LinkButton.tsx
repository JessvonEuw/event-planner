import Link from 'next/link';

export default function LinkButton({ 
  href, 
  children, 
  onClick 
}: { 
  href: string, 
  children: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void 
}) {
  return (
    <Link 
      href={href} 
      className="flex items-center justify-center bg-purple text-white text-sm px-6 py-2 rounded-full"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}


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
      className="flex items-center justify-center bg-purple text-white px-4 py-3 rounded-full w-full"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}


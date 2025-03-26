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
      className="bg-purple text-white px-4 py-2 rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}


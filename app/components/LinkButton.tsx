import Link from 'next/link';

export default function LinkButton({ 
  href, 
  children, 
  onClick,
  variant = 'regular'
}: { 
  href: string, 
  children: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
  variant?: 'regular' | 'outline'
}) {
  const baseStyles = "flex items-center justify-center text-sm px-6 py-2 border-2 border-secondary rounded-md cursor-pointer";
  const regularStyles = "bg-secondary text-white";
  const outlineStyles = "text-secondary hover:bg-secondary hover:text-white transition-colors";

  return (
    <Link 
      href={href} 
      className={`${baseStyles} ${variant === 'regular' ? regularStyles : outlineStyles}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}


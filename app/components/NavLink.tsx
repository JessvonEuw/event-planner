import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, icon }: { href: string; children: React.ReactNode, icon?: React.ReactNode }) {
  const pathname = usePathname();
  const currentPath = window.location.pathname;
  console.log(currentPath === pathname);

  return (
    <div className="grid grid-cols-4 gap-2 text-sm font-medium hover:text-umber w-full mb-4">
      <div className="col-span-1">
        {icon && icon}
      </div>
      <div className={`col-span-3 flex justify-center items-center hover:text-primary ${pathname === currentPath && "text-purple"}`}>
        <Link href={href}>
          {children}
      </Link>
    </div>
    </div>
  );
}

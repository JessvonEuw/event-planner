"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, icon }: { href: string; children: React.ReactNode, icon?: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="flex justify-center gap-2 text-sm font-medium hover:text-umber text-white mb-4">
      <div className="col-span-1">
        {icon && icon}
      </div>
      <div className={`col-span-3 flex justify-center items-center hover:text-primary ${isActive ? "text-white" : ""}`}>
        <Link href={href}>
          {children}
        </Link>
      </div>
    </div>
  );
}

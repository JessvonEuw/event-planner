"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, icon }: { href: string; children: React.ReactNode, icon?: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className={`w-full flex justify-center items-center gap-2 text-sm font-medium hover:bg-primary-dark px-8 py-2 rounded-full text-white mb-2 ${isActive && 'bg-primary-dark'}`}>
      <div className="col-span-1">
        {icon && icon}
      </div>
      <div className={`col-span-3 flex justify-center items-center hover:text-white/50 ${isActive ? "text-white" : ""}`}>
        <Link href={href}>
          {children}
        </Link>
      </div>
    </div>
  );
}

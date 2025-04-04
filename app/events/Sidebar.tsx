export default function Sidebar({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <aside className={`flex flex-col justify-between gap-6 bg-primary p-10 ${className}`}>
        {children}
    </aside>
  );
}

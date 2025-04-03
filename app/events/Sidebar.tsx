export default function Sidebar({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <aside className={`flex flex-col gap-6 bg-blue/40 p-8 ${className}`}>
        {children}
    </aside>
  );
}

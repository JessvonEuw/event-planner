export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-full lg:w-60 p-4 relative">
      <div className="absolute inset-y-0 left-0 w-[1px] bg-orange/50"></div>
      <div className="absolute inset-y-0 right-0 w-[1px] bg-orange/50"></div>
      {children}
    </aside>
  );
}

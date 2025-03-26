export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-full lg:w-60 flex flex-col gap-4 p-4">
      {children}
    </aside>
  );
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-full lg:w-72 flex flex-col gap-6 p-6 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="space-y-4">
        {children}
      </div>
    </aside>
  );
}


export default function Pill({ children, isActive }: { children: React.ReactNode, isActive: boolean }) {
  return (
    <div className={`${isActive ? "bg-secondary text-white" : "bg-slate-200 text-secondary"} inline-flex text-xs px-3 py-1 rounded-full font-medium`}>
      {children}
    </div>
  );
}
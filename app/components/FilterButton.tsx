export default function FilterButton({ children, onClick, selected }: { children: React.ReactNode, onClick: () => void, selected?: boolean }) {
  return (
    <div className={`${selected ? 'bg-blue-50 text-blue-700' : 'bg-gray-200 text-gray-600'} inline-flex items-center rounded-lg px-3 py-1 font-medium  ring-1 ring-blue-700/10 ring-inset cursor-pointer`} onClick={onClick}>{children}</div>
  );
}

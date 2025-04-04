export default function FilterButton({ children, onClick, selected }: { children: React.ReactNode, onClick: () => void, selected?: boolean }) {
  return (
    <div className={`${selected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'} inline-flex items-center text-sm rounded-lg px-4 py-1 font-medium cursor-pointer`} onClick={onClick}>{children}</div>
  );
}

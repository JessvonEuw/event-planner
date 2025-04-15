
export default function InternalHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-2 py-4">
        <div className="flex justify-between items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
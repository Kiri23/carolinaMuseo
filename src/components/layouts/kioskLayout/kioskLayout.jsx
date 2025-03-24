export function KioskLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-row gap-8">
        {children}
      </div>
    </div>
  );
}

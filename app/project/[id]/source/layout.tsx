export default function SourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Source</h1>
        <p className="text-gray-600 mt-1">
          Manage and organize your project's data sources.
        </p>
      </div>

      {children}
    </div>
  );
}

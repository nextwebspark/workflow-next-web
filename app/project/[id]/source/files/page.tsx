import { SourcePage } from '@/components/source/source-page';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FilesPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <SourcePage
      title="Files"
      description="Upload and manage your project files."
    >
      {/* Files content will go here */}
      <div className="text-sm text-gray-600">
        Files section coming soon...
      </div>
    </SourcePage>
  );
}

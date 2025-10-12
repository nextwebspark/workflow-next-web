import { SourcePage } from '@/components/source/source-page';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TextPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <SourcePage
      title="Text"
      description="Import and process text content."
    >
      {/* Text content will go here */}
      <div className="text-sm text-gray-600">
        Text section coming soon...
      </div>
    </SourcePage>
  );
}

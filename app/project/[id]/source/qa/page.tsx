import { SourcePage } from '@/components/source/source-page';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function QaPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <SourcePage
      title="Q&A"
      description="Create question and answer pairs for your project."
    >
      {/* Q&A content will go here */}
      <div className="text-sm text-gray-600">
        Q&A section coming soon...
      </div>
    </SourcePage>
  );
}

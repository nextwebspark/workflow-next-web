import { SourcePage } from '@/components/source/source-page';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WebsitePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <SourcePage
      title="Website"
      description="Import content from websites and web pages."
    >
      {/* Website content will go here */}
      <div className="text-sm text-gray-600">
        Website section coming soon...
      </div>
    </SourcePage>
  );
}

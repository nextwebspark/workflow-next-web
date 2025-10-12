import { SourcePage } from '@/components/source/source-page';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GoogleDrivePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <SourcePage
      title="Google Drive"
      description="Import content from your Google Drive files."
    >
      {/* Google Drive content will go here */}
      <div className="text-sm text-gray-600">
        Google Drive section coming soon...
      </div>
    </SourcePage>
  );
}

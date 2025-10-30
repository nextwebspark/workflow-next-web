import { SourcePage } from '@/components/source/source-page';
import { FileUploadSection } from "@/components/source/file-upload";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FilesPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams;

  return (
    <SourcePage
      title="Files"
      description="Upload and manage your project files."
    >
      <div className="max-w-3xl mx-auto w-full">
        <FileUploadSection projectId={resolvedParams.id} />
      </div>
    </SourcePage>
  );
}

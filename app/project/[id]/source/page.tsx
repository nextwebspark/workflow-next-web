import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SourcePage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Source</h1>
        <p className="text-gray-600 mt-1">
          Manage and view your project's source data.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Project Source
          </CardTitle>
          <CardDescription className="text-gray-600">
            View and manage your project's source data and configurations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Source content will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

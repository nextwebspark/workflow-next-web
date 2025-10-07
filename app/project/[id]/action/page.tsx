import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ActionPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Action</h1>
        <p className="text-gray-600 mt-1">
          Configure and manage project actions.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Project Actions
          </CardTitle>
          <CardDescription className="text-gray-600">
            Set up and manage automated actions for your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Action content will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

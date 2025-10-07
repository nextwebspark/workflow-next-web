import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PlaygroundPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  await searchParams; // Ensure searchParams are resolved
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Playground</h1>
        <p className="text-gray-600 mt-1">
          Test and experiment with your project's functionality.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Project Playground
          </CardTitle>
          <CardDescription className="text-gray-600">
            Interact with your project in real-time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Playground content will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

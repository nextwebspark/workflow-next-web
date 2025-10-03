import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">
          View insights and performance metrics for your project.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Project Analytics
          </CardTitle>
          <CardDescription className="text-gray-600">
            Monitor and analyze your project's performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Analytics content will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

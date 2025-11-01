import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SourcePageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SourcePage({ title, description, children }: SourcePageProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          {title}
        </CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

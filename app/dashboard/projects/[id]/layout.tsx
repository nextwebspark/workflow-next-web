import { getProjectById } from '@/lib/actions';
import { ProjectLayoutContent } from './project-layout-content';
import { Suspense } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function ProjectLayout({
  children,
  params,
}: LayoutProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.id) {
    throw new Error('Project ID is required');
  }

  const project = await getProjectById(resolvedParams.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="p-6 lg:p-8">
        {children}
    </div>
    </Suspense>
  );
}
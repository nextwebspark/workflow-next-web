import { getProjectById } from '@/lib/actions';
import { ProjectLayoutContent } from './project-layout-content';
import { Suspense } from 'react';

export default async function ProjectLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectLayoutContent project={project}>
        {children}
      </ProjectLayoutContent>
    </Suspense>
  );
}
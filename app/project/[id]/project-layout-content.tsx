'use client';

import { useState } from 'react';
import { ProjectTopBar } from '@/components/project/project-top-bar';
import { ProjectSidebar } from '@/components/project/project-sidebar';
import type { Project } from '@/lib/types';

interface ProjectLayoutContentProps {
  children: React.ReactNode;
  project: Project;
}

export function ProjectLayoutContent({ children, project }: ProjectLayoutContentProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ProjectTopBar 
        projectName={project.name}
        isMobileOpen={isMobileOpen}
        onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ProjectSidebar 
          projectId={project.id}
          isExpanded={isExpanded}
          isMobileOpen={isMobileOpen}
          onExpandToggle={() => setIsExpanded(!isExpanded)}
          onMobileClose={() => setIsMobileOpen(false)}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

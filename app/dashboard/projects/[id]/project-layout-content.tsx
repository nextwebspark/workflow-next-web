'use client';

import type { Project } from '@/lib/types';

interface ProjectLayoutContentProps {
  children: React.ReactNode;
  project: Project; // Keep project prop for potential future use, or remove if not needed.
}

export function ProjectLayoutContent({ children }: ProjectLayoutContentProps) {
  // This component now just passes children through, removing the extra layout.
  return <div className="p-6 lg:p-8">
    {children}
  </div>;
}

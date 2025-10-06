'use client';

import { Menu, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

interface ProjectTopBarProps {
  projectName: string;
  isMobileOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function ProjectTopBar({ 
  projectName, 
  isMobileOpen, 
  onMobileMenuToggle 
}: ProjectTopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuToggle}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Logo */}
        <Link href="/dashboard">
          <Logo />
        </Link>

        {/* Divider */}
        <div className="hidden lg:block h-6 w-px bg-gray-200" />

        {/* Project Name */}
        <h1 className="text-xl font-semibold text-gray-900 truncate max-w-[200px] lg:max-w-[300px]">
          {projectName}
        </h1>
      </div>

      {/* User Button */}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

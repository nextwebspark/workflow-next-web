'use client';

import { Menu, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface TopBarProps {
  projectName: string;
  isMobileOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function TopBar({ projectName, isMobileOpen, onMobileMenuToggle }: TopBarProps) {
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
        <Link href="/dashboard" className="flex items-center">
          <div className="relative h-8 w-8">
            <Image
              src="/components/ui/img/logo-new.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden lg:block h-6 w-px bg-gray-200" />

        {/* Project Name */}
        <h1 className="text-xl font-semibold text-gray-900 truncate max-w-[200px]">
          {projectName}
        </h1>
      </div>

      {/* User Button */}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

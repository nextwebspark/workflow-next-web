'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Menu,
  X,
  PlayCircle, 
  BarChart, 
  Database, 
  Workflow,
  MessageSquare,
  Rocket,
  ChevronDown,
  ChevronUp,
  FileText as Files,
  Globe,
  HardDrive,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  subMenu?: Array<{
    name: string;
    href: string;
    icon: React.ElementType;
  }>;
};

interface SidebarProps {
  user: {
    firstName: string | null;
    lastName: string | null;
    emailAddresses: { emailAddress: string }[];
    imageUrl: string;
  };
}

const sourceSubMenu = [
  { name: 'Files', href: '/files', icon: Files },
  { name: 'Text', href: '/text', icon: MessageCircle },
  { name: 'Website', href: '/website', icon: Globe },
  { name: 'Q&A', href: '/qa', icon: MessageSquare },
  { name: 'Drive', href: '/drive', icon: HardDrive },
];

const projectNavigation: NavigationItem[] = [
  { name: 'Playground', href: '/playground', icon: PlayCircle },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { 
    name: 'Source', 
    href: '/source', 
    icon: Database,
    subMenu: sourceSubMenu
  },
  { name: 'Action', href: '/action', icon: Workflow },
  { name: 'Contact', href: '/contact', icon: MessageSquare },
  { name: 'Deploy', href: '/deploy', icon: Rocket },
];

const dashboardNavigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ user }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);
  const pathname = usePathname();

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.firstName || 'User';
    
  const isProjectRoute = pathname.includes('/dashboard/projects/') && pathname.split('/').length > 3;
  const projectId = isProjectRoute ? pathname.split('/')[3] : null;
  const currentNavigation = isProjectRoute ? projectNavigation : dashboardNavigation;

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Logo />
          </div>

          {/* User Profile */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {displayName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {currentNavigation.map((item) => {
              const baseHref = isProjectRoute 
                ? `/dashboard/projects/${projectId}${item.href}`
                : item.href;
              
              const isActive = pathname === baseHref || 
                pathname.startsWith(baseHref);

              if (item.subMenu) {
                return (
                  <div key={item.name} className="space-y-1">
                    <button
                      onClick={() => setIsSourceExpanded(!isSourceExpanded)}
                      className={cn(
                        "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn(
                          "mr-3 h-5 w-5",
                          isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-900"
                        )} />
                        {item.name}
                      </div>
                      {isSourceExpanded ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </button>
                    
                    {isSourceExpanded && (
                      <div className="ml-4 space-y-1">
                        {item.subMenu.map((subItem) => {
                          const subHref = `${baseHref}${subItem.href}`;
                          const isSubActive = pathname.endsWith(subItem.href);
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={subHref}
                              onClick={() => setIsMobileOpen(false)}
                              className={cn(
                                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                isSubActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              )}
                            >
                              <subItem.icon className={cn(
                                "mr-3 h-4 w-4",
                                isSubActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-900"
                              )} />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  href={baseHref}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-900"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 pb-6">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              asChild
            >
              <Link href={isProjectRoute ? "/dashboard" : "/"}>
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                {isProjectRoute ? "Back to Dashboard" : "Back to Home"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { 
  PlayCircle, 
  BarChart, 
  Database, 
  Workflow,
  MessageSquare,
  Rocket,
  Menu,
  X,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';

const projectNavigation = [
  { name: 'Playground', href: '/playground', icon: PlayCircle },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
  { name: 'Source', href: '/source', icon: Database },
  { name: 'Action', href: '/action', icon: Workflow },
  { name: 'Contact', href: '/contact', icon: MessageSquare },
  { name: 'Deploy', href: '/deploy', icon: Rocket },
];

export default function ProjectLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const { id } = use(params);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Project Name</h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
        {isMobileOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed lg:static inset-y-16 left-0 z-40 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out",
          isExpanded ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="flex flex-col h-full">
            {/* Collapse Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex absolute -right-3 top-3 h-6 w-6 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 
                <ChevronLeft className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </Button>

            {/* Project Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-2">
              {projectNavigation.map((item) => {
                const isActive = pathname === `/project/${id}${item.href}`;
                
                return (
                  <Link
                    key={item.name}
                    href={`/project/${id}${item.href}`}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    title={!isExpanded ? item.name : undefined}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-900",
                      isExpanded ? "mr-3" : "mx-auto"
                    )} />
                    {isExpanded && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>

            {/* Back to Projects Button */}
            <div className="px-3 pb-6">
              <Button
                variant="ghost"
                className={cn(
                  "w-full text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  isExpanded ? "justify-start" : "justify-center px-0"
                )}
                asChild
              >
                <Link href="/dashboard/projects" title={!isExpanded ? "Close Project" : undefined}>
                  <X className={cn("h-5 w-5 text-gray-400", isExpanded ? "mr-3" : "")} />
                  {isExpanded && "Close Project"}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
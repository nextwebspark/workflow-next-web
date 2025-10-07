'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
  PlayCircle, 
  BarChart, 
  Database, 
  Workflow,
  MessageSquare,
  Rocket,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Files,
  Globe,
  MessageCircle,
  HardDrive
} from 'lucide-react';

const sourceSubMenu = [
  { name: 'Files', href: '/source/files', icon: Files },
  { name: 'Text', href: '/source/text', icon: MessageCircle },
  { name: 'Website', href: '/source/website', icon: Globe },
  { name: 'Q&A', href: '/source/qa', icon: MessageSquare },
  { name: 'Drive', href: '/source/drive', icon: HardDrive },
];

const projectNavigation = [
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

interface ProjectSidebarProps {
  projectId: string;
  isExpanded: boolean;
  isMobileOpen: boolean;
  onExpandToggle: () => void;
  onMobileClose: () => void;
}

export function ProjectSidebar({
  projectId,
  isExpanded,
  isMobileOpen,
  onExpandToggle,
  onMobileClose,
}: ProjectSidebarProps) {
  const pathname = usePathname();
  const [isSourceExpanded, setIsSourceExpanded] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onMobileClose}
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
            onClick={onExpandToggle}
          >
            {isExpanded ? 
              <ChevronLeft className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </Button>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {projectNavigation.map((item) => {
              const isActive = pathname === `/project/${projectId}${item.href}`;
              
              const isSourceSection = item.name === 'Source';
              const isSourceActive = pathname.startsWith(`/project/${projectId}/source`);

              if (isSourceSection) {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => setIsSourceExpanded(!isSourceExpanded)}
                      className={cn(
                        "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isSourceActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                      title={!isExpanded ? item.name : undefined}
                    >
                      <div className="flex items-center">
                        <item.icon className={cn(
                          "h-5 w-5",
                          isSourceActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-900",
                          isExpanded ? "mr-3" : "mx-auto"
                        )} />
                        {isExpanded && <span>{item.name}</span>}
                      </div>
                      {isExpanded && (
                        isSourceExpanded ? 
                          <ChevronUp className="h-4 w-4 text-gray-500" /> :
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                    
                    {/* Source Submenu */}
                    {isSourceExpanded && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {sourceSubMenu.map((subItem) => {
                          const isSubActive = pathname === `/project/${projectId}${subItem.href}`;
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={`/project/${projectId}${subItem.href}`}
                              onClick={onMobileClose}
                              className={cn(
                                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                isSubActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              )}
                            >
                              <subItem.icon className={cn(
                                "h-4 w-4 mr-3",
                                isSubActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-900"
                              )} />
                              <span>{subItem.name}</span>
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
                  href={`/project/${projectId}${item.href}`}
                  onClick={onMobileClose}
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
    </>
  );
}

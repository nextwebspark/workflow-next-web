import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';
import { ProjectsTable } from '@/components/dashboard/projects-table';
import { getProjectsByUser } from '@/lib/actions';
import { FolderKanban, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export const runtime = 'nodejs'
export default async function DashboardPage() {
  const user = await currentUser();
  const projects = await getProjectsByUser();

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'In Progress' || p.status === 'Onboarding').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    onHold: projects.filter(p => p.status === 'On Hold').length,
  };

  const displayName = user?.firstName 
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
    : 'there';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FolderKanban className="h-8 w-8 text-blue-500 mr-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-500 mr-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              On Hold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500 mr-3" />
              <div className="text-2xl font-bold text-gray-900">{stats.onHold}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Your Projects
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage and track all your projects in one place.
              </CardDescription>
            </div>
            <CreateProjectDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProjectsTable projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}
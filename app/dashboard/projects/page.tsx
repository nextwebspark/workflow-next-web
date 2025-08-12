import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateProjectDialog } from '@/components/dashboard/create-project-dialog';
import { ProjectsTable } from '@/components/dashboard/projects-table';
import { getProjectsByUser } from '@/lib/actions';

export default async function ProjectsPage() {
  const projects = await getProjectsByUser();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage all your projects and track their progress.
          </p>
        </div>
        <CreateProjectDialog />
      </div>

      {/* Projects Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                All Projects ({projects.length})
              </CardTitle>
              <CardDescription className="text-gray-600">
                View and manage all your projects in one place.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ProjectsTable projects={projects} />
        </CardContent>
      </Card>
    </div>
  );
}
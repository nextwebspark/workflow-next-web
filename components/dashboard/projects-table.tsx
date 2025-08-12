import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Project } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface ProjectsTableProps {
  projects: Project[];
}

const statusColors: Record<string, string> = {
  'Onboarding': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Completed': 'bg-green-100 text-green-800 border-green-200',
  'On Hold': 'bg-gray-100 text-gray-800 border-gray-200',
  'Cancelled': 'bg-red-100 text-red-800 border-red-200',
};

const triggerColors: Record<string, string> = {
  'Manual': 'bg-blue-50 text-blue-700 border-blue-200',
  'Automatic': 'bg-green-50 text-green-700 border-green-200',
  'Scheduled': 'bg-purple-50 text-purple-700 border-purple-200',
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first project.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900">Name</TableHead>
            <TableHead className="font-semibold text-gray-900">Description</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
            <TableHead className="font-semibold text-gray-900">Trigger</TableHead>
            <TableHead className="font-semibold text-gray-900">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="hover:bg-gray-50">
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">{project.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <p className="text-sm text-gray-600 truncate">
                    {project.description || 'No description'}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={statusColors[project.status] || 'bg-gray-100 text-gray-800 border-gray-200'}
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={triggerColors[project.trigger] || 'bg-gray-100 text-gray-800 border-gray-200'}
                >
                  {project.trigger}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
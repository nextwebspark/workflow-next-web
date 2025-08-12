import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, TrendingUp } from 'lucide-react';

const sampleProjects = [
  {
    name: 'Customer Service AI Bot',
    description: 'Automated customer support system handling 90% of inquiries with AI-powered responses.',
    status: 'Live',
    progress: 75,
    team: 4,
    dueDate: 'Deployed',
    statusColor: 'bg-green-500',
  },
  {
    name: 'Sales Pipeline Automation',
    description: 'AI-driven lead qualification and nurturing system with multi-channel integration.',
    status: 'In Progress',
    progress: 65,
    team: 3,
    dueDate: 'Dec 20, 2024',
    statusColor: 'bg-blue-500',
  },
  {
    name: 'Inventory Management AI',
    description: 'Predictive inventory optimization with automated reordering and demand forecasting.',
    status: 'Completed',
    progress: 100,
    team: 5,
    dueDate: 'Nov 15, 2024',
    statusColor: 'bg-green-500',
  },
  {
    name: 'Document Processing AI',
    description: 'Automated document analysis and data extraction for financial services.',
    status: 'Testing',
    progress: 90,
    team: 4,
    dueDate: 'Dec 5, 2024',
    statusColor: 'bg-purple-500',
  },
];

export function ProjectsPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Automation Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real automation solutions we've built for businesses across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sampleProjects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </CardTitle>
                  <Badge className={`${project.statusColor} text-white hover:${project.statusColor}`}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${project.statusColor} transition-all duration-300`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team} specialists</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-medium">
              Join hundreds of businesses already automating with NextWeb Spark
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
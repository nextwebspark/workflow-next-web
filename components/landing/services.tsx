import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, MessageSquare, BarChart3, Network } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'AI Workflow Automation',
    description: 'Streamline repetitive tasks and complex workflows with intelligent AI-powered automation solutions.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: MessageSquare,
    title: 'Customer Support Automation',
    description: 'Deploy AI chatbots and automated support systems to handle customer inquiries 24/7.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'AI-powered Data Analysis',
    description: 'Transform raw data into actionable insights with advanced AI analytics and reporting tools.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Network,
    title: 'Multi-platform Integration',
    description: 'Connect all your business tools and platforms with seamless AI-driven integrations.',
    gradient: 'from-orange-500 to-red-500',
  },
];

export function Services() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AI Automation Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI solutions designed to transform your business operations and boost productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <div className={`inline-flex w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
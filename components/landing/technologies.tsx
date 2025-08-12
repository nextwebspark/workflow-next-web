import { Brain, Workflow, Search, GitBranch, Zap, Bot } from 'lucide-react';

const technologies = [
  {
    icon: Brain,
    name: 'OpenAI',
    description: 'AI models for natural language processing.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Workflow,
    name: 'n8n',
    description: 'Visual automation workflows.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Search,
    name: 'Perplexity AI',
    description: 'AI-powered search and answers.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: GitBranch,
    name: 'LangGraph',
    description: 'Custom AI agent workflows.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    name: 'Zapier',
    description: 'Connect and automate your apps.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Bot,
    name: 'Relevance AI',
    description: 'AI-powered data analysis.',
    gradient: 'from-teal-500 to-blue-500',
  },
];

export function Technologies() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Technologies We Use
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge AI and automation tools to deliver powerful solutions for your business.
          </p>
        </div>

        {/* Infinite Marquee Container */}
        <div className="relative">
          <div className="flex animate-marquee space-x-8">
            {/* First set of technologies */}
            {technologies.map((tech, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${tech.gradient} flex items-center justify-center`}>
                    <tech.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {technologies.map((tech, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${tech.gradient} flex items-center justify-center`}>
                    <tech.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tech.name}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
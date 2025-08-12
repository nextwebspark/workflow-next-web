import { Workflow, Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
        <Workflow className="h-6 w-6 text-white" />
      </div>
      {showText && (
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          NextWeb Spark
        </span>
      )}
    </div>
  );
}
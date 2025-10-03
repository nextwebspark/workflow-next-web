import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export async function Navbar() {
  const user = await currentUser();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="flex items-center space-x-6">
            <a href="https://n8n.io/creators/alokkumar/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              n8n Official Creator
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Contact
            </a>
            {user && (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline">
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
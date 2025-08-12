import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export async function Navbar() {
  const user = await currentUser();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline">
                  <a href="/dashboard">Dashboard</a>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
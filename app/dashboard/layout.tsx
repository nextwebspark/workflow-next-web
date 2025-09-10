import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkUser  = await currentUser();

  if (!clerkUser ) {
    redirect('/');
  }

  // Extract only plain object data
const user_to_pass = {
  firstName: clerkUser.firstName,
  lastName: clerkUser.lastName,
  emailAddresses: clerkUser.primaryEmailAddress?.emailAddress ?? null,
  imageUrl:   clerkUser.imageUrl || ''
};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user_to_pass} />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
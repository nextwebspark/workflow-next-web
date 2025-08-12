import { currentUser } from '@clerk/nextjs/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserButton } from '@clerk/nextjs';

export default async function SettingsPage() {
  const user = await currentUser();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Account Information */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Account Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            View and manage your account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-16 h-16"
                }
              }}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : user?.firstName || 'User'
                }
              </h3>
              <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
              <Badge variant="outline" className="mt-2">
                {user?.emailAddresses[0]?.verification?.status === 'verified' ? 'Verified' : 'Unverified'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
            <div>
              <label className="text-sm font-medium text-gray-700">User ID</label>
              <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded mt-1">
                {user?.id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Created At</label>
              <p className="text-sm text-gray-900 mt-1">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Preferences
          </CardTitle>
          <CardDescription className="text-gray-600">
            Customize your ProjectFlow experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">
            Preference settings will be available in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
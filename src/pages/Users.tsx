
import React, { Suspense, lazy, useMemo } from 'react';
import { useUsers } from '@/hooks/useUsers';
import UserSkeletonGrid from '@/components/UserSkeleton';
import Cart from '@/components/Cart';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertTriangle, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Lazy load components - removing Cart from lazy loading
const UserGrid = lazy(() => import('@/components/UserGrid'));

const Users = () => {
  const { data: users, isLoading, error, refetch } = useUsers();

  const userCount = useMemo(() => {
    return users?.length || 0;
  }, [users]);

  console.log('Users loading state:', isLoading);
  console.log('Users data:', users);
  console.log('Users error:', error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center py-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our amazing community of users from around the world.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Users Section */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <UsersIcon className="h-6 w-6" />
                Community Members
              </h2>
              {users && (
                <p className="text-gray-600">
                  {userCount} members
                </p>
              )}
            </div>

            {/* Error State */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="flex items-center justify-between w-full">
                  <span className="text-red-600">
                    Failed to load users. Please try again.
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => refetch()}
                    className="ml-4"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {isLoading && <UserSkeletonGrid />}

            {/* Users Grid with Suspense */}
            {users && !isLoading && (
              <Suspense fallback={<UserSkeletonGrid />}>
                <div className="animate-fade-in">
                  <UserGrid users={users} />
                </div>
              </Suspense>
            )}

            {/* Empty State */}
            {!isLoading && !error && users?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No users found.</p>
              </div>
            )}
          </div>

          {/* Cart Section - removed Suspense wrapper since Cart is no longer lazy loaded */}
          <div className="lg:w-80">
            <div className="sticky top-8">
              <Cart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;

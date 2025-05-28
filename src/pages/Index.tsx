
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/ProductGrid';
import ProductSkeletonGrid from '@/components/ProductSkeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { data: products, isLoading, error, refetch } = useProducts();

  console.log('Products loading state:', isLoading);
  console.log('Products data:', products);
  console.log('Products error:', error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Hero Section */}
        <div className="text-center py-12 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium products with real-time updates and seamless shopping experience.
          </p>
        </div>

        {/* Products Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-gray-800">
              Featured Products
            </h3>
            {products && (
              <p className="text-gray-600">
                {products.length} products available
              </p>
            )}
          </div>

          {/* Error State */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="flex items-center justify-between w-full">
                <span className="text-red-600">
                  Failed to load products. Please try again.
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
          {isLoading && <ProductSkeletonGrid />}

          {/* Products Grid */}
          {products && !isLoading && (
            <div className="animate-fade-in">
              <ProductGrid products={products} />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

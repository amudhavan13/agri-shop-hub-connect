
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HomeCarousel from '../components/HomeCarousel';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import FilterSidebar from '../components/FilterSidebar';
import Footer from '../components/Footer';
import { Filter, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sampleProducts, topSellingProducts } from '../data/sampleProducts';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  reviews?: Array<{
    rating: number;
  }>;
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [topSellingProductsData, setTopSellingProductsData] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch top selling products
  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch('/api/top-selling');
        const data = await response.json();
        setTopSellingProductsData(data);
      } catch (error) {
        console.log('Using sample top selling products data');
        // Fall back to sample data if API fails
        setTopSellingProductsData(topSellingProducts);
      }
    };

    fetchTopSelling();
  }, []);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Try to fetch from API first
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: '12',
          ...filters
        });

        if (searchParams.get('q')) {
          queryParams.append('search', searchParams.get('q') || '');
        }
        
        const response = await fetch(`/api/products?${queryParams}`);
        const data = await response.json();
        
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.log('Using sample products data');
        // Fall back to sample data if API fails
        setProducts(sampleProducts);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, filters, searchParams, toast]);

  // Fetch recently viewed products for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      const fetchRecentlyViewed = async () => {
        try {
          const response = await fetch('/api/recent-views');
          if (response.ok) {
            const data = await response.json();
            setRecentlyViewed(data);
          }
        } catch (error) {
          // Use some sample data for recently viewed
          setRecentlyViewed(sampleProducts.slice(0, 3));
        }
      };

      fetchRecentlyViewed();
    }
  }, [isAuthenticated]);

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // Handle pagination
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const searchQuery = searchParams.get('q') || '';

  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      {!searchQuery && <HomeCarousel />}

      {/* Search Section */}
      <div className="container mx-auto px-4 py-6">
        <SearchBar initialQuery={searchQuery} className="mb-6" />

        {/* Recently Viewed Products */}
        {isAuthenticated && recentlyViewed.length > 0 && (
          <div className="mb-8">
            <ProductCarousel title="Recently Viewed" products={recentlyViewed} />
          </div>
        )}

        {/* Top Selling Products */}
        {!searchQuery && topSellingProductsData.length > 0 && (
          <ProductCarousel title="Best Sellers" products={topSellingProductsData} />
        )}

        {/* Main Products Section */}
        <div className="mt-10">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {searchQuery ? `Search Results: "${searchQuery}"` : 'All Products'}
            </h2>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[350px] p-0">
                <div className="h-full overflow-auto py-6">
                  <FilterSidebar 
                    onFilterChange={handleFilterChange} 
                    isMobile={true} 
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid with Sidebar */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden md:block w-full md:w-64 lg:w-72">
              <FilterSidebar onFilterChange={handleFilterChange} />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-200 rounded-lg h-80"></div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={handlePrevPage}
                          disabled={page <= 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm">
                          Page {page} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          onClick={handleNextPage}
                          disabled={page >= totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <X size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No products match your search for "${searchQuery}"`
                      : 'No products match the selected filters'
                    }
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/">View All Products</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

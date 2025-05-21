import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProductCarousel from '../components/ProductCarousel';
import ProductReviews from '../components/ProductReviews';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { sampleProducts } from '../data/sampleProducts';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors?: string[];
  reviews?: Array<{
    _id: string;
    userId: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  category: string;
  stockQuantity: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Try to fetch from API first
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
        
        // If the product has colors, set the first one as default
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        
        // Track product view if user is authenticated
        if (isAuthenticated) {
          try {
            await fetch(`/api/products/${id}/view`, { method: 'POST' });
          } catch (error) {
            console.error('Failed to track product view:', error);
          }
        }
        
      } catch (error) {
        console.log('Using sample product data');
        // Find the product in sample data
        const sampleProduct = sampleProducts.find(p => p._id === id);
        if (sampleProduct) {
          setProduct(sampleProduct);
          
          // If the product has colors, set the first one as default
          if (sampleProduct.colors && sampleProduct.colors.length > 0) {
            setSelectedColor(sampleProduct.colors[0]);
          }
        } else {
          toast({
            title: 'Error',
            description: 'Product not found',
            variant: 'destructive'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isAuthenticated, toast]);
  
  // Fetch similar products
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!id || !product) return;
      
      try {
        const response = await fetch(`/api/products/${id}/similar?limit=4`);
        
        if (response.ok) {
          const data = await response.json();
          setSimilarProducts(data);
        }
      } catch (error) {
        console.log('Using sample similar products');
        // Find similar products from sample data based on category
        if (product) {
          const similar = sampleProducts
            .filter(p => p.category === product.category && p._id !== id)
            .slice(0, 4);
          setSimilarProducts(similar);
        }
      }
    };
    
    if (product) {
      fetchSimilarProducts();
    }
  }, [id, product]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      ...product,
      quantity,
      selectedColor: selectedColor || product.colors?.[0] || null,
    });

    toast({
      title: 'Success',
      description: `${quantity} ${product.name} added to cart.`,
    });
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2>Product not found</h2>
          <Link to="/" className="text-blue-500">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images Carousel */}
          <div>
            <ProductCarousel products={[product]} />
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="font-bold text-gray-700 mr-2">Price:</span>
              <span className="text-xl text-green-600">${product.price}</span>
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <span className="font-bold text-gray-700 mr-2">Color:</span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                        }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="flex items-center mb-4">
              <span className="font-bold text-gray-700 mr-2">Quantity:</span>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{quantity}</span>
                <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={product.stockQuantity <= quantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full mb-4" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>

            {/* Stock Information */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 mr-2">Stock:</span>
              <span>{product.stockQuantity} available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Similar Products</h2>
          <ProductCarousel products={similarProducts} />
        </div>
      )}

      {/* Product Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
          <ProductReviews reviews={product.reviews} />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;

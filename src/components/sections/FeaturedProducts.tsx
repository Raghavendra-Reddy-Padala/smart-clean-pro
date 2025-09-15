import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { getProducts } from '@/services/firebase';
import type { Product } from '@/services/firebase';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Show first 8 products as featured
        setProducts(data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0] || '',
      category: product.categoryId,
    });
  };

  if (loading) {
    return (
      <section className="px-4 py-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="heading-section mb-1">Featured Products</h2>
              <p className="text-premium">Top-rated professional cleaning solutions</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-none w-64 card-premium p-4 animate-pulse">
                <div className="aspect-square bg-secondary rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-secondary rounded w-1/2"></div>
                  <div className="h-4 bg-secondary rounded"></div>
                  <div className="h-3 bg-secondary rounded w-3/4"></div>
                  <div className="h-6 bg-secondary rounded w-1/3"></div>
                  <div className="h-8 bg-secondary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="heading-section mb-1">Featured Products</h2>
            <p className="text-premium">Top-rated professional cleaning solutions</p>
          </div>
          <button className="text-primary font-medium text-sm hover:text-primary-hover">
            View All
          </button>
        </div>

        {/* Products Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-none w-64 card-premium p-4 hover:shadow-card-hover transition-all"
            >
              {/* Product Image & Badge */}
              <div className="relative mb-4">
                <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                  <img 
                    src={product.images[0] || '/placeholder.svg'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.salePrice && (
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 font-semibold">
                    Save ₹{(product.price - product.salePrice).toFixed(0)}
                  </span>
                )}

                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                {/* Product Name */}
                <h3 className="font-semibold text-sm leading-tight">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-primary">
                    ₹{product.salePrice || product.price}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="text-xs">
                  {product.stock > 0 ? (
                    <span className="text-success">In Stock ({product.stock} units)</span>
                  ) : (
                    <span className="text-destructive">Out of Stock</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full touch-target"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {product.stock > 0 ? 'Add to Cart' : 'Notify Me'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-6">
          <div className="card-premium p-6 bg-gradient-card">
            <h3 className="font-bold text-lg mb-2">Professional Cleaning Solutions</h3>
            <p className="text-premium mb-4">
              Discover our complete range of commercial-grade cleaning chemicals
            </p>
            <Button variant="outline" className="font-semibold">
              View All Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
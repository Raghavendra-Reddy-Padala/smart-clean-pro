import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { getProductsByCategory, getCategories } from '@/services/firebase';
import { useCartStore } from '@/store/useCartStore';
import type { Product, Category } from '@/services/firebase';

const CategoryProducts = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) return;
      
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProductsByCategory(categoryId),
          getCategories()
        ]);
        
        setProducts(productsData);
        const foundCategory = categoriesData.find(cat => cat.id === categoryId);
        setCategory(foundCategory || null);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

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
      <Layout>
        <div className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="h-8 bg-secondary rounded w-1/3 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card-premium p-4 animate-pulse">
                  <div className="aspect-square bg-secondary rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary rounded"></div>
                    <div className="h-3 bg-secondary rounded w-2/3"></div>
                    <div className="h-6 bg-secondary rounded w-1/2"></div>
                    <div className="h-8 bg-secondary rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Category Header */}
          {category && (
            <div className="mb-8">
              <h1 className="heading-section mb-2">{category.name}</h1>
              <p className="text-premium">{category.description}</p>
            </div>
          )}

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium p-4 hover:shadow-card-hover transition-all"
                >
                  {/* Product Image */}
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
                        <span className="text-white font-semibold text-sm">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2">
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
              <p className="text-muted-foreground">
                We couldn't find any products in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
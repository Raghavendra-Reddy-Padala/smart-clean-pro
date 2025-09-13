import { Button } from '@/components/ui/button';
import { Plus, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

// Import product images
import productDisinfectant from '@/assets/product-disinfectant.jpg';
import productFloorCleaner from '@/assets/product-floor-cleaner.jpg';
import productGlassCleaner from '@/assets/product-glass-cleaner.jpg';
import productBathroomCleaner from '@/assets/product-bathroom-cleaner.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  inStock: boolean;
  bulkPrice: {
    tier1: { min: number; price: number };
    tier2: { min: number; price: number };
    tier3: { min: number; price: number };
  };
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Multi-Surface Disinfectant Pro',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 127,
    image: productDisinfectant,
    category: 'Disinfectants',
    badge: 'Bestseller',
    inStock: true,
    bulkPrice: {
      tier1: { min: 1, price: 24.99 },
      tier2: { min: 10, price: 22.49 },
      tier3: { min: 50, price: 19.99 }
    }
  },
  {
    id: '2',
    name: 'Industrial Floor Cleaner',
    price: 34.99,
    rating: 4.9,
    reviews: 89,
    image: productFloorCleaner,
    category: 'Floor Care',
    inStock: true,
    bulkPrice: {
      tier1: { min: 1, price: 34.99 },
      tier2: { min: 10, price: 31.49 },
      tier3: { min: 50, price: 27.99 }
    }
  },
  {
    id: '3',
    name: 'Glass & Mirror Shine',
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.7,
    reviews: 203,
    image: productGlassCleaner,
    category: 'Glass Care',
    badge: 'Save 20%',
    inStock: true,
    bulkPrice: {
      tier1: { min: 1, price: 18.99 },
      tier2: { min: 10, price: 17.09 },
      tier3: { min: 50, price: 15.19 }
    }
  },
  {
    id: '4',
    name: 'Bathroom Deep Clean Formula',
    price: 28.99,
    rating: 4.8,
    reviews: 156,
    image: productBathroomCleaner,
    category: 'Bathroom',
    inStock: false,
    bulkPrice: {
      tier1: { min: 1, price: 28.99 },
      tier2: { min: 10, price: 26.09 },
      tier3: { min: 50, price: 23.19 }
    }
  }
];

const FeaturedProducts = () => {
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      bulkPrice: product.bulkPrice
    });
  };

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
          {featuredProducts.map((product, index) => (
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
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 font-semibold">
                    {product.badge}
                  </span>
                )}

                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                {/* Category */}
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </p>

                {/* Product Name */}
                <h3 className="font-semibold text-sm leading-tight">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) 
                            ? 'text-warning fill-warning' 
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-primary">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Bulk Pricing Hint */}
                <div className="text-xs text-success">
                  <Truck className="w-3 h-3 inline mr-1" />
                  Save ₹{(product.price - product.bulkPrice.tier2.price).toFixed(2)} on 10+ units
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="w-full touch-target"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {product.inStock ? 'Add to Cart' : 'Notify Me'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bulk Order CTA */}
        <div className="mt-8 text-center">
          <div className="card-premium p-6 bg-gradient-card">
            <h3 className="font-bold text-lg mb-2">Need Bulk Quantities?</h3>
            <p className="text-premium mb-4">
              Get better prices and dedicated support for orders over ₹10,000
            </p>
            <Button variant="outline" className="font-semibold">
              Request Bulk Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
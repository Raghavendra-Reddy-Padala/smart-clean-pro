import { 
  Sparkles, 
  Bath, 
  Sofa, 
  MoreHorizontal, 
  ChefHat, 
  FlaskConical 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon: typeof Sparkles;
  color: string;
  count?: number;
}

const categories: Category[] = [
  { id: 'fresheners', name: 'Room Fresheners', icon: Sparkles, color: 'text-accent', count: 24 },
  { id: 'bathroom', name: 'Bathroom Cleaners', icon: Bath, color: 'text-primary', count: 18 },
  { id: 'furniture', name: 'Furniture Cleaners', icon: Sofa, color: 'text-warning', count: 15 },
  { id: 'floor', name: 'Floor Cleaners', icon: MoreHorizontal, color: 'text-success', count: 22 },
  { id: 'kitchen', name: 'Kitchen Chemicals', icon: ChefHat, color: 'text-destructive', count: 31 },
  { id: 'specialty', name: 'Specialty Solutions', icon: FlaskConical, color: 'text-gold', count: 12 },
];

const CategoryGrid = () => {
  return (
    <section className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="heading-section mb-2">Product Categories</h2>
          <p className="text-premium">Professional cleaning solutions for every need</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="card-premium p-4 text-center cursor-pointer group hover:shadow-card-hover transition-all"
              >
                {/* Icon */}
                <div className="mb-3">
                  <div className="w-12 h-12 mx-auto bg-secondary rounded-lg flex items-center justify-center group-hover:bg-secondary-hover transition-colors">
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="font-semibold text-sm text-foreground mb-1 leading-tight">
                  {category.name}
                </h3>

                {/* Product Count */}
                {category.count && (
                  <p className="text-xs text-muted-foreground">
                    {category.count} products
                  </p>
                )}

                {/* Hover Effect Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-2 text-primary text-xs font-medium"
                >
                  View All →
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-6">
          <button className="text-primary font-medium hover:text-primary-hover transition-colors">
            View All Categories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
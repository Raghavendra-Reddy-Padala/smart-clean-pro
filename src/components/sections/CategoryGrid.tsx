import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategories } from '@/services/firebase';
import type { Category } from '@/services/firebase';

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return (
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-section mb-2">Product Categories</h2>
            <p className="text-premium">Professional cleaning solutions for every need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-premium p-4 animate-pulse">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-lg mb-3"></div>
                <div className="h-4 bg-secondary rounded mb-2"></div>
                <div className="h-3 bg-secondary rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
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
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(category.id)}
              className="card-premium p-4 text-center cursor-pointer group hover:shadow-card-hover transition-all"
            >
              {/* Category Image */}
              <div className="mb-3">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-lg overflow-hidden group-hover:bg-secondary-hover transition-colors">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Category Name */}
              <h3 className="font-semibold text-sm text-foreground mb-1 leading-tight">
                {category.name}
              </h3>

              {/* Category Description */}
              <p className="text-xs text-muted-foreground line-clamp-2">
                {category.description}
              </p>

              {/* Hover Effect Arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="mt-2 text-primary text-xs font-medium"
              >
                View All →
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/categories')}
            className="text-primary font-medium hover:text-primary-hover transition-colors"
          >
            View All Categories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
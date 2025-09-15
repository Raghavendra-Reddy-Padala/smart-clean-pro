import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getCategories } from '@/services/firebase';
import type { Category } from '@/services/firebase';

const Categories = () => {
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
      <Layout>
        <div className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="heading-section mb-6">Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card-premium p-6 animate-pulse">
                  <div className="aspect-square bg-secondary rounded-lg mb-4"></div>
                  <div className="h-4 bg-secondary rounded mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-2/3"></div>
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
          <h1 className="heading-section mb-6">Product Categories</h1>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.id)}
                className="card-premium p-6 text-center cursor-pointer group hover:shadow-card-hover transition-all"
              >
                <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-4">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {category.name}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-3 text-primary text-sm font-medium"
                >
                  Explore Products →
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
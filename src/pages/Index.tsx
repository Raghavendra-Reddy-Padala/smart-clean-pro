import Layout from '@/components/layout/Layout';
import CategoryGrid from '@/components/sections/CategoryGrid';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Cart from '@/components/ui/cart';

const Index = () => {
  return (
    <Layout>
      <CategoryGrid />
      <FeaturedProducts />
      <TestimonialsSection />
      <Cart />
    </Layout>
  );
};

export default Index;

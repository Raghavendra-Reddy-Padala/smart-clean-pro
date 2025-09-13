import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      <div className="relative px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-3 py-1 mb-4 text-sm bg-white/20 backdrop-blur-sm border border-white/30"
          >
            <Award className="w-4 h-4 mr-2" />
            Premium B2B Solutions
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          >
            Professional Grade Solutions for 
            <span className="block text-accent-light">Hotels & Restaurants</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-lg mx-auto"
          >
            Premium housekeeping chemicals trusted by hospitality professionals. 
            Bulk orders, competitive pricing, reliable delivery.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold px-8 py-3 shadow-button"
            >
              Shop Bulk Orders
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-primary-foreground hover:bg-white/10 px-8 py-3"
            >
              Request Quote
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-accent-light" />
            <p className="text-sm text-primary-foreground/80">Quality Certified</p>
          </div>
          <div className="text-center">
            <Truck className="w-8 h-8 mx-auto mb-2 text-accent-light" />
            <p className="text-sm text-primary-foreground/80">Fast Delivery</p>
          </div>
          <div className="text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-accent-light" />
            <p className="text-sm text-primary-foreground/80">B2B Trusted</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
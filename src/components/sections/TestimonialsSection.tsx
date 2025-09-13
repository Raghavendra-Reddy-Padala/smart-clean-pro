import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  business: string;
  businessType: string;
  rating: number;
  text: string;
  avatar: string;
  logo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    business: 'Grand Palace Hotel',
    businessType: 'Luxury Hotel',
    rating: 5,
    text: 'Smart Cleaners products have transformed our housekeeping operations. The quality is exceptional and bulk pricing helps our bottom line.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '2', 
    name: 'Priya Sharma',
    business: 'Spice Route Restaurant',
    businessType: 'Fine Dining',
    rating: 5,
    text: 'Reliable delivery and professional-grade chemicals. Our kitchen and dining areas have never been cleaner. Highly recommend for hospitality businesses.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '3',
    name: 'Mohammad Ali',
    business: 'Skyline Suites',
    businessType: 'Business Hotel',
    rating: 5,
    text: 'The bulk ordering system is fantastic. We save significantly on costs and their customer service team understands our commercial needs perfectly.',
    avatar: '/api/placeholder/60/60'
  },
  {
    id: '4',
    name: 'Sarah D\'Silva',
    business: 'Coastal Resort & Spa',
    businessType: 'Resort',
    rating: 5,
    text: 'From guest rooms to spa facilities, Smart Cleaners provides solutions for every area. The eco-friendly options align with our sustainability goals.',
    avatar: '/api/placeholder/60/60'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="px-4 py-12 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="heading-section mb-2">Trusted by Industry Leaders</h2>
          <p className="text-premium max-w-2xl mx-auto">
            See what hospitality professionals say about our cleaning solutions and service
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="card-premium p-6 relative hover:shadow-card-hover transition-all"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20" />

              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating 
                        ? 'text-warning fill-warning' 
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-foreground leading-relaxed mb-4">
                "{testimonial.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 bg-secondary object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.business}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.businessType}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-6 text-center"
        >
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Hotels & Restaurants</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">4.8★</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary">99%</p>
            <p className="text-sm text-muted-foreground">Reorder Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
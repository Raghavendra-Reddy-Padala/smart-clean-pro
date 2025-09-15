import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { getCombos } from '@/services/firebase';
import { useCartStore } from '@/store/useCartStore';
import type { Combo } from '@/services/firebase';

const Combos = () => {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const data = await getCombos();
        setCombos(data);
      } catch (error) {
        console.error('Error fetching combos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const handleAddComboToCart = (combo: Combo) => {
    // Add combo as a single item
    addItem({
      id: `combo-${combo.id}`,
      name: combo.name,
      price: combo.comboPrice,
      image: combo.imageUrl,
      category: 'Combo Pack',
    });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const isComboValid = (combo: Combo) => {
    if (!combo.validUntil) return true;
    const validUntil = combo.validUntil.toDate ? combo.validUntil.toDate() : new Date(combo.validUntil);
    return new Date() <= validUntil;
  };

  if (loading) {
    return (
      <Layout>
        <div className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="heading-section mb-6">Combo Deals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-premium p-6 animate-pulse">
                  <div className="aspect-video bg-secondary rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-5 bg-secondary rounded"></div>
                    <div className="h-3 bg-secondary rounded w-2/3"></div>
                    <div className="h-8 bg-secondary rounded w-1/2"></div>
                    <div className="h-10 bg-secondary rounded"></div>
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
          <div className="text-center mb-8">
            <h1 className="heading-section mb-2">Combo Deals</h1>
            <p className="text-premium">Save more with our specially curated product bundles</p>
          </div>

          {combos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {combos.map((combo, index) => (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium p-6 hover:shadow-card-hover transition-all"
                >
                  {/* Combo Image */}
                  <div className="relative mb-4">
                    <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                      <img 
                        src={combo.imageUrl} 
                        alt={combo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Savings Badge */}
                    <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 text-sm font-bold">
                      Save ₹{combo.savings}
                    </div>

                    {/* Validity Badge */}
                    {combo.validUntil && (
                      <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded ${
                        isComboValid(combo) 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-destructive text-destructive-foreground'
                      }`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {isComboValid(combo) ? 'Valid' : 'Expired'}
                      </div>
                    )}
                  </div>

                  {/* Combo Info */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">{combo.name}</h3>
                    <p className="text-sm text-muted-foreground">{combo.description}</p>

                    {/* Products in Combo */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">Includes:</p>
                      {combo.products.map((product, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-center">
                          <Package className="w-3 h-3 mr-2" />
                          {product.quantity}x {product.productName}
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">₹{combo.comboPrice}</span>
                        <div className="text-sm text-muted-foreground">
                          <span className="line-through">₹{combo.originalPrice}</span>
                          <span className="ml-2 text-accent font-semibold">
                            {Math.round((combo.savings / combo.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Validity Period */}
                    {combo.validFrom && combo.validUntil && (
                      <div className="text-xs text-muted-foreground">
                        Valid: {formatDate(combo.validFrom)} - {formatDate(combo.validUntil)}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddComboToCart(combo)}
                      disabled={!isComboValid(combo)}
                      className="w-full touch-target"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isComboValid(combo) ? 'Add Combo to Cart' : 'Offer Expired'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Combo Deals Available</h3>
              <p className="text-muted-foreground">
                Check back later for exciting combo offers and bundle deals.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Combos;
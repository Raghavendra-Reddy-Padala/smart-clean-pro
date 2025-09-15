import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/store/useCartStore';
import { createOrder } from '@/services/firebase';
import { toast } from 'sonner';

const Checkout = () => {
  const [deliveryForm, setDeliveryForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const { user, userProfile } = useAuth();
  const { items, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      navigate('/');
      return;
    }

    // Pre-fill form with user profile data
    if (userProfile) {
      setDeliveryForm({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        address: '',
        city: '',
        pincode: ''
      });
    }
  }, [user, userProfile, items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeliveryForm({
      ...deliveryForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!deliveryForm.name || !deliveryForm.phone || !deliveryForm.address || !deliveryForm.city || !deliveryForm.pincode) {
        toast.error('Please fill all delivery details');
        setLoading(false);
        return;
      }

      // Create order
      const orderId = await createOrder({
        userId: user!.uid,
        items: items,
        totalAmount: totalPrice,
        status: 'pending',
        paymentMethod: 'cod',
        deliveryAddress: deliveryForm
      });

      // Clear cart
      clearCart();

      toast.success('Order placed successfully!');
      navigate(`/orders`);
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shopping
            </Button>
          </div>

          <h1 className="heading-section mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-premium p-6"
              >
                <h2 className="font-bold text-lg mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Delivery Information
                </h2>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        value={deliveryForm.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={deliveryForm.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={deliveryForm.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      rows={3}
                      required
                    />
                  </div>

                  {/* City & Pincode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={deliveryForm.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={deliveryForm.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter pincode"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-primary" />
                      Payment Method
                    </h3>
                    <div className="card-premium p-4 border-2 border-primary">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          value="cod"
                          checked={true}
                          readOnly
                          className="mr-3"
                        />
                        <label htmlFor="cod" className="font-medium">
                          Cash on Delivery (COD)
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Pay when your order is delivered to your doorstep
                      </p>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="submit"
                    className="w-full touch-target mt-6"
                    disabled={loading}
                  >
                    {loading ? 'Placing Order...' : `Place Order • ₹${totalPrice}`}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-premium p-6 sticky top-4"
              >
                <h2 className="font-bold text-lg mb-4">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary rounded overflow-hidden">
                        <img 
                          src={item.image || '/placeholder.svg'} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl text-primary">₹{totalPrice}</span>
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Payment Method: Cash on Delivery
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
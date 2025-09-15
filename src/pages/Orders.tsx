import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserOrders } from '@/services/firebase';
import type { Order } from '@/services/firebase';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const userOrders = await getUserOrders(user.uid);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-accent" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Package className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'confirmed':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'shipped':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'delivered':
        return 'text-success bg-success/10 border-success/20';
      case 'cancelled':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate('/account')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Account
              </Button>
            </div>
            <h1 className="heading-section mb-6">My Orders</h1>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card-premium p-6 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-secondary rounded w-1/4"></div>
                      <div className="h-3 bg-secondary rounded w-1/3"></div>
                    </div>
                    <div className="h-6 bg-secondary rounded w-20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary rounded w-3/4"></div>
                    <div className="h-3 bg-secondary rounded w-1/2"></div>
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate('/account')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Account
            </Button>
          </div>

          <h1 className="heading-section mb-6">My Orders</h1>

          {/* Orders List */}
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-premium p-6 hover:shadow-card-hover transition-all"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.id?.slice(-8).toUpperCase()}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    <div className={`px-3 py-1 rounded border text-sm font-medium capitalize flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </p>
                    <div className="space-y-2">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-secondary rounded overflow-hidden">
                            <img 
                              src={item.image || '/placeholder.svg'} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-bold text-lg text-primary">₹{order.totalAmount}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="text-sm font-medium uppercase">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {order.deliveryAddress && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
                      <p className="text-sm">
                        {order.deliveryAddress.name} • {order.deliveryAddress.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress.address}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button onClick={() => navigate('/')}>
                Start Shopping
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
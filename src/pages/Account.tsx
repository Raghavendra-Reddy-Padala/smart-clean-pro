import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/services/firebase';
import { toast } from 'sonner';

const Account = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-secondary rounded w-1/3"></div>
              <div className="card-premium p-6 space-y-4">
                <div className="h-6 bg-secondary rounded w-1/2"></div>
                <div className="h-4 bg-secondary rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    {
      icon: Package,
      title: 'My Orders',
      description: 'Track and manage your orders',
      path: '/orders',
      color: 'text-primary'
    },
    {
      icon: ShoppingBag,
      title: 'Continue Shopping',
      description: 'Browse our product catalog',
      path: '/',
      color: 'text-accent'
    },
    {
      icon: MapPin,
      title: 'Addresses',
      description: 'Manage delivery addresses',
      path: '/account/addresses',
      color: 'text-success'
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Update your profile information',
      path: '/account/settings',
      color: 'text-warning'
    }
  ];

  return (
    <Layout>
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="heading-section">
                    Welcome back, {userProfile?.name || user.email}!
                  </h1>
                  <p className="text-premium">
                    {userProfile?.businessName && `${userProfile.businessName} • `}
                    Member since {new Date(user.metadata.creationTime!).getFullYear()}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </motion.div>

          {/* Account Menu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className="card-premium p-6 hover:shadow-card-hover transition-all block group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${item.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-premium text-sm">{item.description}</p>
                      </div>
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 card-premium p-6"
          >
            <h2 className="font-bold text-lg mb-4">Account Overview</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">₹0</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">0</div>
                <div className="text-sm text-muted-foreground">Saved Addresses</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
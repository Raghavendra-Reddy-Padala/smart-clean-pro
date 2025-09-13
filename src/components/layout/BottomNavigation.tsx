import { Home, Grid3X3, Package, Warehouse, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'categories', label: 'Categories', icon: Grid3X3 },
  { id: 'combos', label: 'Combos', icon: Package },
  { id: 'bulk', label: 'Bulk Orders', icon: Warehouse },
  { id: 'account', label: 'Account', icon: User },
];

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center touch-target relative flex-1 py-1"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 w-8 h-1 bg-primary rounded-full"
                  style={{ x: '-50%' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`} 
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span 
                className={`text-xs mt-1 transition-colors ${
                  isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="pb-safe" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </nav>
  );
};

export default BottomNavigation;
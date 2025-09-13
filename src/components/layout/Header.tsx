import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCartStore();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary">
            Smart Cleaners
          </h1>
        </div>

        {/* Search Bar - Expandable on mobile */}
        <div className="flex-1 mx-4 max-w-md">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search cleaning supplies..."
                  className="w-full px-4 py-2 text-sm bg-secondary border border-input focus:border-primary focus:outline-none"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="w-full justify-start text-muted-foreground bg-secondary hover:bg-secondary-hover"
              >
                <Search className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Search products...</span>
                <span className="sm:hidden">Search...</span>
              </Button>
            )}
          </AnimatePresence>
        </div>

        {/* Cart and Menu */}
        <div className="flex items-center space-x-2">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCart}
            className="relative touch-target"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </motion.span>
            )}
          </Button>

          {/* Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(true)}
            className="touch-target"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-50 p-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="bg-card p-6 shadow-card ml-auto w-80 h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Menu</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ×
                </Button>
              </div>
              
              <nav className="space-y-4">
                <a href="#" className="block py-2 text-foreground hover:text-primary">
                  Categories
                </a>
                <a href="#" className="block py-2 text-foreground hover:text-primary">
                  Bulk Orders
                </a>
                <a href="#" className="block py-2 text-foreground hover:text-primary">
                  About Us
                </a>
                <a href="#" className="block py-2 text-foreground hover:text-primary">
                  Contact
                </a>
                <a href="#" className="block py-2 text-foreground hover:text-primary">
                  Account
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
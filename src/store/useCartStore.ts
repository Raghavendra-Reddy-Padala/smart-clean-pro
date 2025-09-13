import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  bulkPrice?: {
    tier1: { min: number; price: number }; // 1-9 units
    tier2: { min: number; price: number }; // 10-49 units  
    tier3: { min: number; price: number }; // 50+ units
  };
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  // Computed values
  getBulkPrice: (item: CartItem) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const existingItem = get().items.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          get().updateQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price
          }));
        }
      },

      removeItem: (id) => {
        const item = get().items.find(cartItem => cartItem.id === id);
        if (item) {
          set(state => ({
            items: state.items.filter(cartItem => cartItem.id !== id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - (get().getBulkPrice(item) * item.quantity)
          }));
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set(state => {
          const newItems = state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
          
          const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const newTotalPrice = newItems.reduce((sum, item) => 
            sum + (get().getBulkPrice(item) * item.quantity), 0
          );

          return {
            items: newItems,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      getBulkPrice: (item: CartItem) => {
        if (!item.bulkPrice) return item.price;
        
        const quantity = item.quantity;
        if (quantity >= item.bulkPrice.tier3.min) return item.bulkPrice.tier3.price;
        if (quantity >= item.bulkPrice.tier2.min) return item.bulkPrice.tier2.price;
        if (quantity >= item.bulkPrice.tier1.min) return item.bulkPrice.tier1.price;
        
        return item.price;
      }
    }),
    {
      name: 'smart-cleaners-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
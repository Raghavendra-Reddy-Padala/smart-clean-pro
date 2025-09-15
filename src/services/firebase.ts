import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

// Types
export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  categoryId: string;
  stock: number;
  sku: string;
  weight: string;
  dimensions: string;
  ingredients: string;
  instructions: string;
  isActive: boolean;
  createdAt: any;
}

export interface ComboProduct {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  comboPrice: number;
  originalPrice: number;
  savings: number;
  products: ComboProduct[];
  isActive: boolean;
  isFeatured: boolean;
  validFrom: any;
  validUntil: any;
  createdAt: any;
}

export interface Order {
  id?: string;
  userId: string;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod';
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  createdAt: any;
  updatedAt: any;
}

export interface UserProfile {
  id?: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  addresses: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    isDefault: boolean;
  }[];
  createdAt: any;
}

// Categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'categories'), where('isActive', '==', true))
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'products'), 
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'products'),
        where('categoryId', '==', categoryId),
        where('isActive', '==', true)
      )
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};

// Combos
export const getCombos = async (): Promise<Combo[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'combos'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      )
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Combo));
  } catch (error) {
    console.error('Error fetching combos:', error);
    return [];
  }
};

// Authentication
export const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async () => {
  return firebaseSignOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// User Profile
export const createUserProfile = async (userProfile: Omit<UserProfile, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userProfile,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, 'users'), where('uid', '==', uid))
    );
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Orders
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
    );
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Order));
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};
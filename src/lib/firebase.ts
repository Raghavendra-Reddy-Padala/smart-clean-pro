import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Smart Cleaners Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBp_vEVahkIY216SmAkceBGcL_h6DVUhs",
  authDomain: "smartcleaners5.firebaseapp.com",
  projectId: "smartcleaners5",
  storageBucket: "smartcleaners5.firebasestorage.app",
  messagingSenderId: "371632438384",
  appId: "1:371632438384:web:7d6d6c283de217e01708b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
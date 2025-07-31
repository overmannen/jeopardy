// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUxWBxb_fNG5YGT0j6M04s2YsLwhbfvRA",
  authDomain: "jeopardy-c4584.firebaseapp.com",
  projectId: "jeopardy-c4584",
  storageBucket: "jeopardy-c4584.firebasestorage.app",
  messagingSenderId: "1033114443243",
  appId: "1:1033114443243:web:04f223fe66363fd3ae8dae",
  measurementId: "G-9JK8YB2ZNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

// Export the app instance if needed
export default app;

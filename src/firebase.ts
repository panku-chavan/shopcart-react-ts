import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx4-AtiyqtXg4EoweJa8VNEGCxnw4GSCY",
  authDomain: "shopcart-auth.firebaseapp.com",
  projectId: "shopcart-auth",
  storageBucket: "shopcart-auth.firebasestorage.app",
  messagingSenderId: "238572640803",
  appId: "1:238572640803:web:08969d3f97e74376c76f96",
  measurementId: "G-957F872CKQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjpbPnmazUagjheIsR4zZ-LyEVQWhEzkY",
  authDomain: "task-manager-auth-12902.firebaseapp.com",
  projectId: "task-manager-auth-12902",
  storageBucket: "task-manager-auth-12902.firebasestorage.app",
  messagingSenderId: "560151541031",
  appId: "1:560151541031:web:16a71279c2565475ef6502",
  measurementId: "G-X2BC8B0N80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
// Firebase configuration for Healyz
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO3SsZ1EPwOXK96c-MGnovx8dGeGEzMpo",
  authDomain: "healyz.firebaseapp.com",
  projectId: "healyz",
  storageBucket: "healyz.firebasestorage.app",
  messagingSenderId: "41831464541",
  appId: "1:41831464541:web:087ffe89eae6014cee57b4",
  measurementId: "G-81ZTJDZ0G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbl5NiIaPbqehcAostvUZ37ePzT6foPEo",
  authDomain: "garden-planner-30790.firebaseapp.com",
  projectId: "garden-planner-30790",
  storageBucket: "garden-planner-30790.appspot.com",
  messagingSenderId: "810998706074",
  appId: "1:810998706074:web:7adf12fc892ef086dbd423",
  measurementId: "G-NHN6T15PWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
export { collection, addDoc, setDoc, doc, getDoc };

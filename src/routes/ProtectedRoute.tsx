// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user when auth state changes
      setLoading(false); // Stop loading once the state is determined
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the children
  return children;
};

export default ProtectedRoute;

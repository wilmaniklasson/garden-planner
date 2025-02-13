// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

// ProctedRoute is a wrapper component that checks if the user is logged in
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the children
  return children;
};

export default ProtectedRoute;

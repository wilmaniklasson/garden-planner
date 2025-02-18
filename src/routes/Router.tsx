import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
import LoadingSpinner from "../utils/LoadingSpinner/LoadingSpinner";
import ProtectedRoute from "./ProtectedRoute";
// Dynamically import the pages
const LoginPage = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const CanvasPage = React.lazy(() => import("../pages/CanvasPage/CanvasPage"));


const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Routes>
          {/* The login page is accessible without logging in */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected pages - use ProtectedRoute to secure routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/canvas"
            element={
              <ProtectedRoute>
                <CanvasPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;

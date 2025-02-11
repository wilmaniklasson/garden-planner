import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import React from "react";

// Dynamiska importeringar
const LoginPage = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const HomePage = React.lazy(() => import("../pages/HomePage/HomePage"));
const CanvasPage = React.lazy(() => import("../pages/CanvasPage/CanvasPage"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/canvas" element={<CanvasPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import CanvasPage from "../pages/CanvasPage/CanvasPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/canvas" element={<CanvasPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Välkommen!</h1>
      <button 
        onClick={() => navigate("/canvas")} 
        className="homepage-button">
        Gå till Canvas
      </button>
    </div>
  );
};

export default HomePage;
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/"); 
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Välkommen!</h1>
      <button 
        onClick={() => navigate("/canvas")} 
        className="homepage-button">
        Gå till Canvas
      </button>

      <button 
        onClick={handleLogout} 
        className="homepage-button">
        Logga ut
      </button>
    </div>
  );
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./HomePage.css";
import DeleteAccountButton from "../../components/DeleteAccountButton/DeleteAccountButton";

const HomePage = () => {
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    const auth = getAuth();
    
    try {
      await signOut(auth);  // Sign the user out from Firebase
      navigate("/");  // Redirect to login page
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-wrapper">
        <h1 className="homepage-title">Welcome!</h1>
        <div className="button-container">
          <button 
            type="button"
            onClick={() => navigate("/canvas")} 
            className="to-canvas-button">
            Go to Canvas
          </button>

          <button 
            type="button"
            onClick={handleLogout} 
            className="log-out-button">
            Log out
          </button>
          <DeleteAccountButton />
        </div>
      
      </div>
    </div>
  );
};

export default HomePage;

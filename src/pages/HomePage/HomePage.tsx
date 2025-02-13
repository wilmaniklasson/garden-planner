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
      <h1 className="homepage-title">Welcome!</h1>
      
      <button 
        onClick={() => navigate("/canvas")} 
        className="homepage-button">
        Go to Canvas
      </button>

      <button 
        onClick={handleLogout} 
        className="homepage-button">
        Log out
      </button>
      <DeleteAccountButton />
    </div>
  );
};

export default HomePage;

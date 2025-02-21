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
    <>
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
    <footer>
  <p>Some icons in this project are created by <a href="https://www.freepik.com/author/macrovector-official" target="_blank" rel="noopener">macrovector_official</a>, <a href="https://www.freepik.com/author/brgfx" target="_blank" rel="noopener">brgfx</a>, and <a href="https://www.freepik.com/author/pch-vector" target="_blank" rel="noopener">pch.vector</a>, and are used under Freepik's license.</p>
</footer>

    </>
    
  );
};

export default HomePage;

import { getAuth, deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

// Delete user account custom hook
const useDeleteAccount = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  const deleteAccount = async () => {
    const auth = getAuth(); // Get authentication instance from Firebase
    const user = auth.currentUser; // Get the currently logged-in user

    if (user) { // If a user is logged in
      try {
        await deleteUser(user); // Delete the user's account
        console.log("User account deleted!"); // Log success message
        navigate("/"); // Navigate to the home page after deletion
      } catch (error) {
        console.error("Error deleting account:", error); // Handle error during deletion
      }
    } else {
      console.log("No user is logged in."); // If no user is logged in
    }
  };

  return deleteAccount; // Return the deleteAccount function so it can be used in components
};

export default useDeleteAccount; // Export the custom hook for use in other parts of the application

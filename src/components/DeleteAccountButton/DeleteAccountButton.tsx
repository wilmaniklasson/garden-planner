import { useState } from 'react';
import useDeleteAccount from '../../auth/deleteAccount';
import './DeleteAccountButton.css';

const DeleteAccountButton = () => {
  const [showConfirm, setShowConfirm] = useState(false); // State to show/hide the confirmation dialog
  const [loading, setLoading] = useState(false); // State to handle loading during account deletion
  const deleteAccount = useDeleteAccount(); // Custom hook to handle account deletion

  // Function for the "Delete Account" button
  const handleDeleteClick = () => {
    setShowConfirm(true); // Show the confirmation dialog
  };

  // Function to confirm account deletion
  const handleConfirmDelete = async () => {
    setLoading(true); // Show loading state
    await deleteAccount(); // Call the deleteAccount function from the custom hook
    setLoading(false); // Hide loading state
    setShowConfirm(false); // Close the confirmation dialog
  };

  // Function to cancel the deletion
  const handleCancelDelete = () => {
    setShowConfirm(false); // Hide the confirmation dialog
  };

  return (
    <div>
      {/* "Delete Account" button */}
      <button onClick={handleDeleteClick} className="delete-account-button">
        Delete Account
      </button>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            {/* Button to confirm deletion */}
            <button onClick={handleConfirmDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Yes, delete account'}
            </button>
            {/* Button to cancel the deletion */}
            <button onClick={handleCancelDelete}>
              No, cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountButton;

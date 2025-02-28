import React from 'react';
import './HelpModal.css';
import { useModalStore } from '../../store/Modal';
import { FaTimes } from 'react-icons/fa';

const HelpModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <button onClick={closeModal} title="Close">
            <FaTimes size={15} />
          </button>
        </div>
        <div className="modal-content">
          <h3>Select Item</h3>
          <p>Select an item from the menu by clicking on it. Click on the canvas to place the selected item.</p>
          <p>Click again to deselect an item or tool from the menu.</p>
        </div>
        <div className="modal-content">
          <h3>Select and Adjust Item</h3>
          <p>On the canvas, double-click to select an item, and click outside to deselect it.</p>
          <p>When an item is selected, you can adjust its size and orientation, or use Control+C and Control+V to copy and paste.</p>
        </div>
        <div className="modal-content">
          <h3>Move Item</h3>
          <p>To move an item on the canvas, click and hold it, then drag it to a new position.</p>
        </div>
        <div className="modal-content">
          <h3>Use Color Picker</h3>
          <p>Use the color picker under 'Design Tools' to customize the color of elements.</p>
        </div>
        <div className="modal-content">
          <h3>Edit Item</h3>
          <p>Click the "Edit" button to adjust the size and orientation of an item.</p>
        </div>
        <div className="modal-content">
          <h3>Save Design</h3>
          <p>Click the "Save" button to save your design to your account.</p>
        </div>
        <div className="modal-content">
          <h3>Export Design</h3>
          <p>Click the "Export" button to save your design as an image file.</p>
        </div>
        <div className="modal-content">
          <h3>Delete Item</h3>
          <p>Click the "Delete" button, then click on an item to remove it from the canvas.</p>
        </div>
        <div className="modal-content">
          <h3>Move Canvas</h3>
          <p>Click the "Move Canvas" button to move around the canvas.</p>
        </div>
        <div className="modal-content">
          <h3>Zoom</h3>
          <p>You can zoom in and out of the canvas by clicking the plus and minus buttons.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;


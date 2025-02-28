// HelpModal.tsx
import React from 'react';
import './HelpModal.css';
import { useModalStore } from '../../store/Modal';
import { FaTimes } from 'react-icons/fa';
import SelectedElement from '../../assets/images/HelpElement/SelectedElement.svg';

const HelpModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen) return null;

  return (
    <div className="overlay"> 
      <div className="modal">
        <div className='modal-header'>
          <button onClick={closeModal} title="Close"> <FaTimes size={15} /></button>
        </div>
        <div className='modal-content'>
          <img  src={SelectedElement} alt="Selected-Element" />
          <p>Select an element in the menu by clicking it. Click again to deselect. On the canvas, double-click to select and click outside to deselect.</p>            
        </div>
        <div className='modal-content'>
          <p>Move an element on the canvas by clicking and holding, then dragging the element.</p>
        </div>
        
        <p>🔄 **Resize & Rotate:** Click on an item to adjust its size and orientation.</p>
        <p>🎨 **Change Color:** Use the color picker to customize elements.</p>
        <p>💾 **Save & Load:** Your design is automatically saved in your account.</p>
      </div>
    </div>
  );
};

export default HelpModal;


import { FaHandPointer, FaTrash } from 'react-icons/fa';
import './Options.css';

import OptionProps from './OptionProps';


const Actions: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, }) => {
    return (
        <div className='Actions'>
       
            <div className='options'>
            
            
                <button 
                className={`option-button ${selectedTool === 'edit' ? 'selected' : ''}`} 
                onClick={() => handleSelectTool('edit')}
                >
                    <div className='option-image-container'>
                        <FaHandPointer className='Draw-icon' />
                    </div>
                
                <p className='option-text'>Select</p>
                </button>
                <button 
                className={`option-button ${selectedTool === 'delete' ? 'selected' : ''}`} 
                onClick={() => handleSelectTool('delete')}
                >
                     <div className='option-image-container'>
                     <FaTrash className='Draw-icon' />
                     </div>
                
                <p className='option-text'>Delete</p>
                </button>
            </div>
        </div>
        );
    }


export default Actions;
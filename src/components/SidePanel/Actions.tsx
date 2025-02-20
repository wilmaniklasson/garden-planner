
import { FaHandPointer, FaTrash } from 'react-icons/fa';
import './Options.css';

import OptionProps from './OptionProps';


const Actions: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, }) => {
    return (
        <div>
       
            <div className='options'>
                <button 
                className={`option-button ${selectedTool === 'edit' ? 'selected' : ''}`} 
                onClick={() => handleSelectTool('edit')}
                >
                <FaHandPointer className='Draw-icon' />
                <p className='option-text'>Select</p>
                </button>
                <button 
                className={`option-button ${selectedTool === 'delete' ? 'selected' : ''}`} 
                onClick={() => handleSelectTool('delete')}
                >
                <FaTrash className='Draw-icon' />
                <p className='option-text'>Delete</p>
                </button>
            </div>
        </div>
        );
    }


export default Actions;
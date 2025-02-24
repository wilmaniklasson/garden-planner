
import { FaHandPointer, FaTrash } from 'react-icons/fa';
import '../SidePanel/Options.css';

import { useCanvasToolsStore } from '../../store/CanvasToolsStore';
import { useState } from 'react';


const Actions: React.FC = () => {

    const { setTool} = useCanvasToolsStore(); 
     
     const [selectedTool, setSelectedTool] = useState<string>('');
    
    
      const handleSelectTool = (tool: string) => {
        if (selectedTool === tool) {
          setTool('');
          setSelectedTool('');
        } else {
          setTool(tool);
          setSelectedTool(tool);
        }
      };
    return (
        <div className='Actions'>
       
            <div className='options'>
            
            
                <button 
                className={`option-button ${selectedTool === 'move-canvas' ? 'selected' : ''}`} 
                onClick={() => handleSelectTool('move-canvas')}
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
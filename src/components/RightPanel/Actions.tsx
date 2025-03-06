import { FaTrash, FaExpandArrowsAlt, FaHandPaper } from 'react-icons/fa';
import '../LeftPanel/Options.css';
import { useCanvasToolsStore } from '../../store/CanvasToolsStore';
import { useState } from 'react';
import { useCanvasStore } from '../../store/CanvasStore';

const Actions: React.FC = () => {
  const { setTool } = useCanvasToolsStore();
  const { shapes, setSelectedShapeIndex } = useCanvasStore();
  const [selectedTool, setSelectedTool] = useState<string>('');


 
  const handleSelectTool = (tool: string) => {
    if (selectedTool === tool) {
      setTool('');
      setSelectedTool('');
    } else {
      setTool(tool);
      setSelectedTool(tool);
  
      if (tool === 'transform' && shapes.length > 0) {
        setSelectedShapeIndex(0);
      }
    }
  };

  return (
    <div className='Actions'>
      <div className='Actions-options'>
        
        {/* Move Canvas Tool */}
        <button 
          className={`option-button ${selectedTool === 'move-canvas' ? 'selected' : ''}`} 
          onClick={() => handleSelectTool('move-canvas')}
        >
          <div className='option-image-container'>
            <FaHandPaper className='Draw-icon' />
          </div>
          <p className='option-text'>Move Canvas</p>
        </button>

        {/* Delete Tool */}
        <button 
          className={`option-button ${selectedTool === 'delete' ? 'selected' : ''}`} 
          onClick={() => handleSelectTool('delete')}
        >
          <div className='option-image-container'>
            <FaTrash className='Draw-icon' />
          </div>
          <p className='option-text'>Delete</p>
        </button>

        {/* Edit Tool */}
        <button 
          className={`option-button ${selectedTool === 'transform' ? 'selected' : ''}`} 
          onClick={() => handleSelectTool('transform')}
        >
          <div className='option-image-container'>
            <FaExpandArrowsAlt className='Draw-icon' />
          </div>
          <p className='option-text'>Edit</p>
        </button>

      </div>
    </div>
  );
}

export default Actions;


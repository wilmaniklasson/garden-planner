
import { MdGrass } from 'react-icons/md';
import './Options.css';
import circleGrass from '../../assets/images/GroundMaterials/circle-grass.svg';
import rectGrass from '../../assets/images/GroundMaterials/rect-grass.svg';
import OptionProps from './OptionProps';


  const GroundMaterials: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
    return (
      <div>
        <div className='icon-container' onClick={toggle}>
          <MdGrass className='icon' size={40} color="#382918" />
          <h2 className='option-name'>Ground Materials</h2>
        </div>
  
        {isOpen && (
          <div className='options'>
            <button 
            className={`option-button ${selectedTool === 'circle-grass' ? 'selected' : ''}`} 
            onClick={() => handleSelectTool('circle-grass')}
            >
                <div className='option-image-container'>
                  <img src={circleGrass} alt="Grass Circle" className='option-image' />
                </div>
             
              <p className='option-text'>Round Lawn</p>
            </button>
            <button 
              className={`option-button ${selectedTool === 'rect-grass' ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('rect-grass')}
            >
               <div className='option-image-container'>
                <img src={rectGrass} alt="Grass Rectangle" className='option-image' />

               </div>
              
              <p className='option-text'>Rect Lawn</p>
            </button>
          </div>
        )}
      </div>
    );
  };

export default GroundMaterials;

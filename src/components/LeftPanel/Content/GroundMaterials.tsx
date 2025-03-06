
import { MdGrass } from 'react-icons/md';
import '../Options.css';
import circleGrass from '../../../assets/images/GroundMaterials/circle-grass.svg';
import rectGrass from '../../../assets/images/GroundMaterials/rect-grass.svg';
import gardenBed from '../../../assets/images/GroundMaterials/garden-bed.svg';
import circleGardenBed from '../../../assets/images/GroundMaterials/circle-garden-bed.svg';
import WedgeGardenBed from '../../../assets/images/GroundMaterials/wedge-garden-bed.svg';
import WedgeGrass from '../../../assets/images/GroundMaterials/wedge-grass.svg';
import WedgeGardenBed90Angle from '../../../assets/images/GroundMaterials/Wedge-Garden-Bed-90-angel.svg';
import OptionProps from '../OptionProps';


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
              className={`option-button ${selectedTool === 'rect-grass' ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('rect-grass')}
            >
               <div className='option-image-container'>
                <img src={rectGrass} alt="Grass Rectangle" className='option-image' />

               </div>
              
              <p className='option-text'>Rect Lawn</p>
            </button>
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
            className={`option-button ${selectedTool === 'wedge-grass' ? 'selected' : ''}`} 
            onClick={() => handleSelectTool('wedge-grass')}
            >
                <div className='option-image-container'>
                  <img src={WedgeGrass} alt="wedge-grass" className='option-image' />
                </div>
             
              <p className='option-text'>Wedge Grass</p>
            </button>
            <button 
              className={`option-button ${selectedTool === 'garden-bed' ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('garden-bed')}
            >
               <div className='option-image-container'>
                <img src={gardenBed} alt="garden-bed" className='option-image' />

               </div>
              
              <p className='option-text'>Garden Bed</p>
            </button>
            <button 
              className={`option-button ${selectedTool === 'circle-garden-bed' ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('circle-garden-bed')}
            >
               <div className='option-image-container'>
                <img src={circleGardenBed} alt="circle-garden-bed" className='option-image' />
               </div>
               <p className='option-text'>Round Garden Bed</p>
            </button>
            <button 
              className={`option-button ${selectedTool === 'wedge-garden-bed' ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('wedge-garden-bed')}
            >
               <div className='option-image-container'>
                <img src={WedgeGardenBed} alt="wedge-garden-bed" className='option-image' />
               </div>
               <p className='option-text'>Wedge Garden Bed</p>
            </button>
            <button 
              className={`option-button ${selectedTool === 'wedge-garden-bed-90-angle' ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('wedge-garden-bed-90-angle')}
            >
               <div className='option-image-container'>
                <img src={WedgeGardenBed90Angle} alt="wedge-garden-bed" className='option-image' />
               </div>
               <p className='option-text'>Wedge Garden Bed</p>
            </button>
          </div>
        )}
      </div>
    );
  };

export default GroundMaterials;

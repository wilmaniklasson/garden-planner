import { MdGrass } from 'react-icons/md';
import '../../Options.css';
import OptionProps from '../../OptionProps';
import items from './GroundMaterialsItems';

const GroundMaterials: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  return (
    <div>
      <div className='icon-container' onClick={toggle}>
        <MdGrass className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Ground Materials</h2>
      </div>

      {isOpen && (
        <div className='options'>
          {items.map(({ name, img}) => (
            <button 
              key={name} 
              className={`option-button ${selectedTool === name ? 'selected' : ''}`} 
              onClick={() => handleSelectTool(name)}
            >
              <div className='option-image-container'>
                <img src={img} alt={name} className='option-image' />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroundMaterials;

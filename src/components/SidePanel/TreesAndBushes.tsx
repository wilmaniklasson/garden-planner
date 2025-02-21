import { FaTree } from 'react-icons/fa';
import './Options.css';
import OptionProps from './OptionProps';
import CloudBush from '../../assets/images/TreesAndBushes/Cloud-Bush.svg';
import JapaneseTree from '../../assets/images/TreesAndBushes/Japanese-Tree.svg';

const TreesAndBushes: React.FC<OptionProps> = ({ selectedTool, selectedSVG, handleSelectTool, isOpen, toggle }) => {
  return (
    <div>

      <div className='icon-container' onClick={toggle}>
        <FaTree className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Trees & Bushes</h2>
      </div>

      {isOpen && (
        <div className='options'>
          {[
            { name: 'Cloud Bush', img: CloudBush },
            { name: 'Japanese Tree', img: JapaneseTree }
          ].map(({ name, img }) => (
            <button 
              key={name}
              className={`option-button ${selectedTool === 'svg' && selectedSVG === img ? 'selected' : ''}`} 
              onClick={() => handleSelectTool('svg', img)}
            >
              <img src={img} alt={name} className='option-image' />
              <p className='option-text'>{name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreesAndBushes;

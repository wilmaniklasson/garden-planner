import { MdLocalFlorist } from 'react-icons/md';

import './Options.css';
import OptionProps from './OptionProps';
import GreenPlant from '../../assets/images/Plants/Green-Plant.svg';
import MixColorPlant from '../../assets/images/Plants/Mix-Color-Plant.svg';

const Plants: React.FC<OptionProps> = ({ selectedTool, selectedSVG, handleSelectTool, isOpen, toggle }) => {
  return (
    <div>

      <div className='icon-container' onClick={toggle}>
        <MdLocalFlorist className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Plants</h2>
      </div>

      {isOpen && (
        <div className='options'>
          {[
            { name: 'Green Plant', img: GreenPlant },
            { name: 'Mix Color Plant', img: MixColorPlant }
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

export default Plants;

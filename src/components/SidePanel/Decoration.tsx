import {  MdFence} from 'react-icons/md';

import './Options.css';
import OptionProps from './OptionProps';
import Pool from '../../assets/images/Decoration/Pool.svg';
import Stone from '../../assets/images/Decoration/Stone.svg';

const Decoration: React.FC<OptionProps> = ({ selectedTool, selectedSVG, handleSelectTool, isOpen, toggle }) => {
  return (
    <div>

      <div className='icon' onClick={toggle}>
      <MdFence size={40} color="#382918" />
      <h2 className='option-name'>Decoration</h2>
      </div>

      {isOpen && (
        <div className='options'>
          {[
            { name: 'Pool', img: Pool },
            { name: 'Stone', img: Stone }
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


export default Decoration;

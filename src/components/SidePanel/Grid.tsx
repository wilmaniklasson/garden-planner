
import './Options.css';
import OptionProps from './OptionProps';
import OptionsList from './OptionsList';
import background from '../../assets/background.svg';
import backgroundIcon from '../../assets/background-icon.svg';
const Grid: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Grid background', img: background},

  ];


  return (

     <div>
          <div className='icon-container' onClick={toggle}>
            <img src={backgroundIcon} alt="Background" className='icon' />
            <h2 className='option-name'>Background</h2>
          </div>
    
      <OptionsList
        isOpen={isOpen}
        selectedTool={selectedTool}
        handleSelectTool={handleSelectTool}
        items={items}
      />
    </div>
  );
};

export default Grid;
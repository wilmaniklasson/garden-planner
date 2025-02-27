import './Options.css';
import { MdGridOn } from 'react-icons/md';
import background from '../../assets/background.svg';
import whiteBackground from '../../assets/white-background.svg';
import OptionsList from './OptionsList';
import OptionProps from './OptionProps';


const Grid: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
 
    { name: 'Grid background', img: background },
    { name: 'White background', img: whiteBackground },
 
  
  ];

  return (
    <div>
     <div className="icon-container" onClick={toggle}>
        <MdGridOn className="icon" size={40} color="#382918" />
        <h2 className="option-name">Background</h2>
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
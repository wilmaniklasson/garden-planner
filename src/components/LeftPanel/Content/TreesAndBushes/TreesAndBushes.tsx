
import { FaTree } from 'react-icons/fa';
import '../../Options.css';
import OptionProps from '../../OptionProps';
import OptionsList from '../../OptionsList';
import items from './TreesAndBushesItems';

const TreesAndBushes: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
   
  return (
    <div>
      <div className='icon-container' onClick={toggle}>
        <FaTree className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Trees & Bushes</h2>
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

export default TreesAndBushes;




            
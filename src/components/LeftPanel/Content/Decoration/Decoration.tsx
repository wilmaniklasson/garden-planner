import { MdFence } from 'react-icons/md';
import '../../Options.css';
import OptionProps from '../../OptionProps';
import OptionsList from '../../OptionsList';
import items from './DecorationItems';

const Decoration: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {

  return (
    <div>
      <div className='icon-container' onClick={toggle}>
        <MdFence className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Decoration</h2>
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

export default Decoration;

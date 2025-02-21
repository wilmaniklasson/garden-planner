
import { FaTree } from 'react-icons/fa';
import './Options.css';
import OptionProps from './OptionProps';
import CloudBush from '../../assets/images/TreesAndBushes/Cloud-Bush.svg';
import JapaneseTree from '../../assets/images/TreesAndBushes/Japanese-Tree.svg';
import OptionsList from './OptionsList';

const TreesAndBushes: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Cloud Bush', img: CloudBush },
    { name: 'Japanese Tree', img: JapaneseTree }
  ];
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




            
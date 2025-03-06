
import { FaTree } from 'react-icons/fa';
import '../Options.css';
import OptionProps from '../OptionProps';
import OptionsList from '../OptionsList';
import TreeNr1 from '../../../assets/images/TreesAndBushes/Tree-Nr-1.svg';
import TreeNr2 from '../../../assets/images/TreesAndBushes/Tree-Nr-2.svg';
import TreeNr3 from '../../../assets/images/TreesAndBushes/Tree-Nr-3.svg';
import TreeNr4 from '../../../assets/images/TreesAndBushes/Tree-Nr-4.svg';
import TreeNr5 from '../../../assets/images/TreesAndBushes/Tree-Nr-5.svg';
import TreeNr6 from '../../../assets/images/TreesAndBushes/Tree-Nr-6.svg';
import TreeNr7 from '../../../assets/images/TreesAndBushes/Tree-Nr-7.svg';
import TreeNr8 from '../../../assets/images/TreesAndBushes/Tree-Nr-8.svg';
import TreeNr9 from '../../../assets/images/TreesAndBushes/Tree-Nr-9.svg';
import TreeNr10 from '../../../assets/images/TreesAndBushes/Tree-Nr-10.svg';

const TreesAndBushes: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Tree Nr 1', img: TreeNr1 },
    { name: 'Tree Nr 2', img: TreeNr2 },
    { name: 'Tree Nr 3', img: TreeNr3 },
    { name: 'Tree Nr 4', img: TreeNr4 },
    { name: 'Tree Nr 5', img: TreeNr5 },
    { name: 'Tree Nr 6', img: TreeNr6 },
    { name: 'Tree Nr 7', img: TreeNr7 },
    { name: 'Tree Nr 8', img: TreeNr8 },
    { name: 'Tree Nr 9', img: TreeNr9 },
    { name: 'Tree Nr 10', img: TreeNr10 }
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




            
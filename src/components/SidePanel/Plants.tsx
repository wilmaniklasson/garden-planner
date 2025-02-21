import { MdLocalFlorist } from 'react-icons/md';
import './Options.css';
import OptionProps from './OptionProps';
import GreenPlant from '../../assets/images/Plants/Green-Plant.svg';
import MixColorPlant from '../../assets/images/Plants/Mix-Color-Plant.svg';
import OptionsList from './OptionsList';

const Plants: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Green Plant', img: GreenPlant },
    { name: 'Mix Color Plant', img: MixColorPlant }
  ];

  return (
    <div>
      <div className='icon-container' onClick={toggle}>
        <MdLocalFlorist className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Plants</h2>
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

export default Plants;
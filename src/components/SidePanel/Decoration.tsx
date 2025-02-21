import { MdFence } from 'react-icons/md';
import './Options.css';
import OptionProps from './OptionProps';
import OptionsList from './OptionsList';
import StonePatio from '../../assets/images/Decoration/Stone-Patio.svg';
import Pathway from '../../assets/images/Decoration/Pathway.svg';
import PathwayCorner from '../../assets/images/Decoration/Pathway-corner.svg';
import House from '../../assets/images/Decoration/House3.svg';
import StonePatioHexagon from '../../assets/images/Decoration/Stone-Patio-Hexagon.svg';
import PearShapedPool from '../../assets/images/Decoration/pear-shaped-pool.svg';

const Decoration: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Pear Shaped Pool', img: PearShapedPool },
    { name: 'Stone Patio', img: StonePatio },
    { name: 'Stone Patio Hexagon', img: StonePatioHexagon },
    { name: 'Pathway', img: Pathway },
    { name: 'Pathway Corner', img: PathwayCorner },
    { name: 'House', img: House }

  ];

  return (
    <div>
      {/* Specifik del för varje kategori */}
      <div className='icon-container' onClick={toggle}>
        <MdFence className='icon' size={40} color="#382918" />
        <h2 className='option-name'>Decoration</h2>
      </div>

      {/* Använd den återanvändbara OptionsList-komponenten */}
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

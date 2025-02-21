import { MdFence } from 'react-icons/md';
import './Options.css';
import OptionProps from './OptionProps';
import Pool from '../../assets/images/Decoration/Pool.svg';
import Stone from '../../assets/images/Decoration/Stone.svg';
import OptionsList from './OptionsList';  // Importera den nya komponenten

const Decoration: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Pool', img: Pool },
    { name: 'Stone', img: Stone }
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

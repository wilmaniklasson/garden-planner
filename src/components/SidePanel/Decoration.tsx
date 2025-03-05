import { MdFence } from 'react-icons/md';
import './Options.css';
import OptionProps from './OptionProps';
import OptionsList from './OptionsList';
import StonePatio from '../../assets/images/Decoration/Stone-Patio.svg';
import Pathway from '../../assets/images/Decoration/Pathway.svg';
import PathwayCorner from '../../assets/images/Decoration/Pathway-corner.svg';
import StonePatioHexagon from '../../assets/images/Decoration/Stone-Patio-Hexagon.svg';
import HouseNr1 from '../../assets/images/Decoration/House-Nr-1.svg';
import HouseNr2 from '../../assets/images/Decoration/House-Nr-2.svg';
import HouseNr3 from '../../assets/images/Decoration/House-Nr-3.svg';
import HouseNr4 from '../../assets/images/Decoration/House-Nr-4.svg';
import HouseNr5 from '../../assets/images/Decoration/House-Nr-5.svg';
import HouseNr6 from '../../assets/images/Decoration/House-Nr-6.svg'; 
import PearShapedPool from '../../assets/images/Decoration/pear-shaped-pool.svg';
import PearShapedPond from '../../assets/images/Decoration/pear-shaped-pond.svg';
import RundShapedPool from '../../assets/images/Decoration/rund-shaped-pool.svg';
import RundShapedPond from '../../assets/images/Decoration/rund-shaped-pond.svg';
import WoodenFence from '../../assets/images/Decoration/Wooden-Fence.svg';
import WoodenFence1 from '../../assets/images/Decoration/Wooden-Fence1.svg';
import DiningSet from '../../assets/images/Decoration/Dining-Set.svg';
import WoodenBench from '../../assets/images/Decoration/Wooden-Bench.svg';
import WoodenTable from '../../assets/images/Decoration/Wooden-Table.svg';
import StoneNr1 from '../../assets/images/Decoration/Stone-Nr-1.svg';
import StoneNr2 from '../../assets/images/Decoration/Stone-Nr-2.svg';
import StoneNr3 from '../../assets/images/Decoration/Stone-Nr-3.svg';
import StoneNr4 from '../../assets/images/Decoration/Stone-Nr-4.svg';
import StoneNr5 from '../../assets/images/Decoration/Stone-Nr-5.svg';
import StoneNr6 from '../../assets/images/Decoration/Stone-Nr-6.svg';
import StonePatioTerracotta from '../../assets/images/Decoration/Stone-Patio-Terracotta.svg';
import PatioTerracotta from '../../assets/images/Decoration/Patio-Terracotta.svg';
import WoodenBench1 from '../../assets/images/Decoration/Wooden-Bench1.svg';
import WoodenTable1 from '../../assets/images/Decoration/Wooden-Table1.svg';
import StonePatioTerracotta2 from '../../assets/images/Decoration/Stone-Patio-Terracotta2.svg';
const Decoration: React.FC<OptionProps> = ({ selectedTool, handleSelectTool, isOpen, toggle }) => {
  const items = [
    { name: 'Stone Patio', img: StonePatio },
    { name: 'Stone Patio Hexagon', img: StonePatioHexagon },
    { name: 'Pathway', img: Pathway },
    { name: 'Pathway Corner', img: PathwayCorner },
    { name: 'House Nr. 1', img: HouseNr1 },
    { name: 'House Nr. 2', img: HouseNr2 },
    { name: 'House Nr. 3', img: HouseNr3 },
    { name: 'House Nr. 4', img: HouseNr4 },
    { name: 'House Nr. 5', img: HouseNr5 },
    { name: 'House Nr. 6', img: HouseNr6 },
    { name: 'Pear Shaped Pond', img: PearShapedPond },
    { name: 'Pear Shaped Pool', img: PearShapedPool },
    { name: 'Rund Shaped Pool', img: RundShapedPool },
    { name: 'Rund Shaped Pond', img: RundShapedPond},
    { name: 'Wooden Fence', img: WoodenFence },
    { name: 'Wooden Fence 1', img: WoodenFence1 },
    { name: 'Dining Set', img: DiningSet },
    { name: 'Wooden Bench', img: WoodenBench },
    { name: 'Wooden Bench 1', img: WoodenBench1 },
    { name: 'Wooden Table', img: WoodenTable },
    { name: 'Wooden Table 1', img: WoodenTable1 },
    { name: 'Stone Nr. 1', img: StoneNr1 },
    { name: 'Stone Nr. 2', img: StoneNr2 },
    { name: 'Stone Nr. 3', img: StoneNr3 },
    { name: 'Stone Nr. 4', img: StoneNr4 },
    { name: 'Stone Nr. 5', img: StoneNr5 },
    { name: 'Stone Nr. 6', img: StoneNr6 },
    { name: 'Stone Patio Terracotta', img: StonePatioTerracotta},
    { name: 'Patio Terracotta', img: PatioTerracotta },
    { name: 'Stone Patio Terracotta 2', img: StonePatioTerracotta2 },
    




    


  ];

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

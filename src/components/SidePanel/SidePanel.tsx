import { MdFence, MdGrass, MdLocalFlorist } from 'react-icons/md';
import { FaTree } from 'react-icons/fa';
import './SidePanel.css';
import icon from '../../assets/garden-planner-icon.svg';

const SidePanel: React.FC = () => {
  return (
    <aside className='side-panel'>
      <div className='side-panel-header'>
        <h1>Garden Planner</h1>
        <img src={icon} alt="Garden Planner Icon" />
      </div>
      <div className='icon'>
        <MdGrass size={40} color="#382918" />
        <h2>Ground Materials</h2>
      </div>
      <div className='icon'>
        <FaTree size={40} color="#382918" />
        <h2>Trees & Bushes</h2>
      </div>
      <div className='icon'>
        <MdLocalFlorist size={40} color="#382918" />
        <h2>Plants & Flowers</h2>
      </div>
      <div className='icon'>
        <MdFence size={40} color="#382918" />
        <h2>Decoration</h2>
      </div>
    </aside>
  );
};

export default SidePanel;

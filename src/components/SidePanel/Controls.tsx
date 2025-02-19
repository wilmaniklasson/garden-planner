import React, { useState } from 'react';
import './SidePanel.css';
import { MdGrass, } from 'react-icons/md';
//import {  MdFence, MdLocalFlorist } from 'react-icons/md';
//import { FaTree } from 'react-icons/fa';
import icon from '../../assets/garden-planner-icon.svg';
// Bushes
import SquircleBush from '../../assets/images/Squircle-Bush.svg';
import LayeredSquircleBush from '../../assets/images/Layered-Squircle-Bush.svg';
import StarShapedBush from '../../assets/images/Star-Shaped-Bush.svg';
import LayeredStarShapedBush from '../../assets/images/Layered-Star-Shaped-Bush.svg';
import SquircleBushGroup from '../../assets/images/Squircle-Bush-Group.svg';
import SmallSquircleBushGroup from '../../assets/images/Small-Squircle-Bush-Group.svg';
// Flowers
import PinkFlower from '../../assets/images/Pink-Flower.svg';
import TripleLayerPinkFlower from '../../assets/images/Triple-Layer-Pink-Flower.svg';
import MultiLayeredPinkFlower from '../../assets/images/Multi-Layered-Pink-Flower.svg';
import PinkFlowerGroup from '../../assets/images/Pink-Flower-Group.svg';
import BigPinkFloweGroup from '../../assets/images/Big-Pink-Flower-Group.svg';
import './GroundMaterials.css';

import circleGrass from '../../assets/images/GroundMaterials/circle-grass.svg';
import rectGrass from '../../assets/images/GroundMaterials/rect-grass.svg';
import { useCanvasToolsStore } from '../../store/store';




const Controls: React.FC = () => {
  const { tool, setTool, color, setColor, lineWidth, setLineWidth, SVG, setSVG} = useCanvasToolsStore(); 
  const [collapsed, setCollapsed] = useState(false); 

  const togglePanel = () => {
    setCollapsed(!collapsed); // Uppdatera collapsed state
  };

  const [showOptions, setShowOptions] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>('');

  const handleSelectTool = (tool: string) => {
    setTool(tool);
    setSelectedTool(tool);
  };

  return (
    <>
    <aside className={`side-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="menu-icon" onClick={togglePanel}>
        <span>{collapsed ? '☰' : '✖'}</span>
      </div>
   
      <div className='side-panel-header'>
        <h1>Garden Planner</h1>
        <img className='Garden-Planner-Icon' src={icon} alt="Garden Planner Icon" />
      </div>
       
    
      <div>
      <div className='icon' onClick={() => setShowOptions(!showOptions)}>
        <MdGrass size={40} color="#382918" />
        <h2 className='option-name'>Ground Materials</h2>
      </div>
      
      {showOptions && (
        <div className='options'>
          <button 
            className={`option-button ${selectedTool === 'circle-grass' ? 'selected' : ''}`} 
            onClick={() => handleSelectTool('circle-grass')}
          >
            <img src={circleGrass} alt="Grass Circle" className='option-image' />
            <p className='option-text'>Round Lawn</p>
          </button>
          <button 
            className={`option-button ${selectedTool === 'rect-grass' ? 'selected' : ''}`} 
            onClick={() => handleSelectTool('rect-grass')}
          >
            <img src={rectGrass} alt="Grass Rectangle" className='option-image' />
            <p className='option-text'>Rect Lawn</p>
          </button>
        </div>
      )}
    </div>
      
      {/*
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
      */}
    
    <div className={`controls ${collapsed ? 'collapsed' : ''}`}>
      {/* Color Picker */}
      <label>Color:</label>
      <input 
        type="color" 
        title="Pick a color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)}
      />
      
      {/* Line width */}
      <label htmlFor="lineWidth">Line Width:</label>
      <input
        id="lineWidth"
        type="range"
        title="Choose line width"
        min="1"
        max="50"
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
        step="1"
      />


      {/* Tool Selector */}
      <label>Tool:</label>
      <select 
        title="Select Tool" 
        value={tool} 
        onChange={(e) => setTool(e.target.value)}
      >
        <option value="">None</option>
        <option value="draw">Draw</option>
        <option value="circle">Place Circle</option>
        <option value="rectangle">Place Rectangle</option>
        <option value="svg">Place Garde element</option>
        <option value="edit">Select</option>
        <option value="delete">Delete</option>
      
      </select>

      {/* SVG Selector */}
      <label>Select SVG:</label>
      <select 
        title="Choose an SVG" 
        value={SVG} 
        onChange={(e) => setSVG(e.target.value)} 
      >
        <option value="">None</option>
        <option value={SquircleBush}>Squircle Bush</option>
        <option value={LayeredSquircleBush}>Layered Squircle Bush</option>
        <option value={StarShapedBush}>Star Shaped Bush</option>
        <option value={LayeredStarShapedBush}>Layered Star Shaped Bush</option>
        <option value={SquircleBushGroup}>Squircle Bush Group</option>
        <option value={SmallSquircleBushGroup}>Small Squircle Bush Group</option>
        <option value={PinkFlower}>Pink Flower</option>
        <option value={TripleLayerPinkFlower}>Triple Layer Pink Flower</option>
        <option value={MultiLayeredPinkFlower}>Multi Layered Pink Flower</option>
        <option value={PinkFlowerGroup}>Pink Flower Group</option>
        <option value={BigPinkFloweGroup}>Big Pink Flower Group</option>
      </select>
    </div>
    </aside>
    </>


    
  );
};

export default Controls;

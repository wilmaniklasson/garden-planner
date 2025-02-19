import React, { useState } from 'react';
import './SidePanel.css';
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
import './options.css';

import { useCanvasToolsStore } from '../../store/CanvasToolsStore';
import GroundMaterials from './GroundMaterials';
import TreesAndBushes from './TreesAndBushes';
import Plants from './Plants';
import Decoration from './Decoration';




const Controls: React.FC = () => {
  const { tool, setTool, color, setColor, lineWidth, setLineWidth, SVG, setSVG} = useCanvasToolsStore(); 
  const [collapsed, setCollapsed] = useState(false); 

  const togglePanel = () => {
    setCollapsed(!collapsed); // Uppdatera collapsed state
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('');


  const handleSelectTool = (tool: string) => {
    setTool(tool);
    setSelectedTool(tool);
  };
  

  const toggleCategory = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
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
  <GroundMaterials 
    selectedTool={selectedTool} 
    handleSelectTool={handleSelectTool}
    isOpen={selectedCategory === "groundMaterials"} 
    toggle={() => toggleCategory("groundMaterials")} 
  />
  
  <TreesAndBushes 
    selectedTool={selectedTool} 
    isOpen={selectedCategory === "treesAndBushes"} 
    toggle={() => toggleCategory("treesAndBushes")} 
    handleSelectTool={(tool, svg) => {
      setTool(tool);
      setSVG(svg);
    }}
  />

  <Plants 
    selectedTool={selectedTool} 
    isOpen={selectedCategory === "plants"} 
    toggle={() => toggleCategory("plants")} 
    handleSelectTool={(tool, svg) => {
      setTool(tool);
      setSVG(svg);
    }}
  />

  <Decoration 
    selectedTool={selectedTool} 
    isOpen={selectedCategory === "decoration"} 
    toggle={() => toggleCategory("decoration")} 
    handleSelectTool={(tool, svg) => {
      setTool(tool);
      setSVG(svg);
    }}
  />
</div>


      
    
    

      
      
    
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
        <option value="line">Draw</option>
        <option value="circle">Place Circle</option>
        <option value="rect">Place Rectangle</option>
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

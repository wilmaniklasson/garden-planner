import React from 'react';

interface ControlsProps {
  tool: string;  // Selected tool
  setTool: React.Dispatch<React.SetStateAction<string>>;  // Update selected tool
  color: string;  // Selected color
  setColor: React.Dispatch<React.SetStateAction<string>>;  // Update selected color
  selectedSVG: string;  // Selected SVG
  setSelectedSVG: React.Dispatch<React.SetStateAction<string>>;  // Update selected SVG
  lineWidth: number; // Line width
  setLineWidth: React.Dispatch<React.SetStateAction<number>>; // Update line width
  handleExport: () => void;  // Export the design
}

const Controls: React.FC<ControlsProps> = ({ tool, setTool, color, setColor, selectedSVG, setSelectedSVG, handleExport, lineWidth, setLineWidth }) => {
  return (
    <div className="controls">
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
        <option value="draw">Draw</option>
        <option value="circle">Place Circle</option>
        <option value="rectangle">Place Rectangle</option>
        <option value="svg">Place SVG</option>
        <option value="edit">Select</option>
        <option value="delete">Delete</option>
      </select>

      {/* SVG Selector */}
      <label>Select SVG:</label>
      <select 
        title="Choose an SVG" 
        value={selectedSVG} 
        onChange={(e) => setSelectedSVG(e.target.value)} 
      >
        <option value="/src/assets/images/tree.svg">Tree</option>
        <option value="/src/assets/images/flower.svg">Flower</option>
        <option value="/src/assets/images/bush.svg">Bush</option>
        <option value="/src/assets/images/stone-tiles.svg">Stone Tiles</option>
        <option value="/src/assets/images/small-stones.svg">Small Stones</option>
      </select>

      {/* Export Button */}
      <button type="button" onClick={handleExport}>Export</button>
    </div>
  );
};

export default Controls;

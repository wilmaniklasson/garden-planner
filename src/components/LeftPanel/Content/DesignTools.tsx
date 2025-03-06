import React from 'react';
import { FaPaintBrush, FaPencilAlt } from "react-icons/fa";
import '../Options.css';

interface DesignToolsProps {
  selectedTool: string;
  handleSelectTool: (tool: string) => void;
  isOpen: boolean;
  toggle: () => void;
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
}

const TOOLS = [
  { type: 'circle', label: 'Circle', className: 'color-option-circle-preview' },
  { type: 'rect', label: 'Square', className: 'color-option-Rectangle-preview' }
];

const ToolButton: React.FC<{ tool: string; label: string; selectedTool: string; handleSelectTool: (tool: string) => void; className: string; color?: string }> = ({ tool, label, selectedTool, handleSelectTool, className, color }) => (
  <button
    className={`option-button ${selectedTool === tool ? 'selected' : ''}`}
    onClick={() => handleSelectTool(tool)}
  >
    <div className='color-option'>
      <div className={className} style={color ? { backgroundColor: color } : {}} />
    </div>
    <label className='option-text'>{label}</label>
  </button>
);

const ColorPicker: React.FC<{ color: string; setColor: (color: string) => void }> = ({ color, setColor }) => (
  <div className="color-picker">
    <input type="color" title="Pick a color" value={color} onChange={(e) => setColor(e.target.value)} />
    <label className='option-text'>Color</label>
  </div>
);

const LineWidthSlider: React.FC<{ lineWidth: number; setLineWidth: (width: number) => void }> = ({ lineWidth, setLineWidth }) => (
  <div className="line-width-container">
    <div className="slider-wrapper">
      <input
        type="range"
        title="Choose line width"
        min="1"
        max="50"
        value={lineWidth}
        onChange={(e) => setLineWidth(Number(e.target.value))}
        step="1"
        className="styled-slider"
      />
      <div className="line-preview" style={{ width: `${lineWidth}px`, height: `${lineWidth}px` }} />
    </div>
    <label className='option-text'>Line Width</label>
  </div>
);

const DesignTools: React.FC<DesignToolsProps> = ({ selectedTool, handleSelectTool, isOpen, toggle, color, setColor, lineWidth, setLineWidth }) => {
  return (
    <div className="design-tools-wrapper">
      <div className="design-tools">
        <div className="icon-container" onClick={toggle}>
          <FaPaintBrush className="icon" size={40} color="#382918" />
          <h2 className="option-name">Design Tools</h2>
        </div>

        {isOpen && (
          <div className="DesignTools-options">
            {/* Shapes */}
            <div className="options">
              {TOOLS.map(({ type, label, className }) => (
                <ToolButton key={type} tool={type} label={label} selectedTool={selectedTool} handleSelectTool={handleSelectTool} className={className} color={color} />
              ))}
            </div>

            {/* Color Picker & Draw Tool */}
            <div className="options">
              <ColorPicker color={color} setColor={setColor} />

              <button
                className={`option-button ${selectedTool === 'line' ? 'selected' : ''}`}
                onClick={() => handleSelectTool('line')}
              >
                <div className='color-option'>
                  <FaPencilAlt className='Draw-icon' />
                </div>
                <p className='option-text'>Draw</p>
              </button>
            </div>

            {/* Line Width Slider */}
            <LineWidthSlider lineWidth={lineWidth} setLineWidth={setLineWidth} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignTools;

import React from 'react';
import { FaPaintBrush, FaPencilAlt } from "react-icons/fa";
import './Options.css';

interface DesignToolsProps {
  selectedTool: string;
  handleSelectTool: (tool: string, svg?: string) => void;
  isOpen: boolean;
  toggle: () => void;
  color: string;
  setColor: (color: string) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
}

const DesignTools: React.FC<DesignToolsProps> = ({
  selectedTool, 
  handleSelectTool, 
  isOpen, 
  toggle, 
  color, 
  setColor, 
  lineWidth, 
  setLineWidth 
}) => {
  return (
    <div className="design-tools-wrapper">
      <div className="design-tools">
        <div className="icon-container" onClick={toggle}>
          <FaPaintBrush className="icon-container"size={40} color="#382918" />
          <h2 className="option-name">Design Tools</h2>
        </div>

        {isOpen && (
          <div className="DesignTools-options">
            {/* First section with Circle and Rectangle options */}
            <div className="options">
              <button
                className={`option-button ${selectedTool === 'circle' ? 'selected' : ''}`}
                onClick={() => handleSelectTool('circle')}
              >
                  <div className='color-option'>
                    <div 
                      className="color-option-circle-preview" 
                      style={{ backgroundColor: color }}
                    />
                </div>
                <label className='option-text'>Circle</label>
              </button>

              <button
                className={`option-button ${selectedTool === 'rect' ? 'selected' : ''}`}
                onClick={() => handleSelectTool('rect')}
              >
                <div className='color-option'>
                  <div 
                    className="color-option-Rectangle-preview" 
                    style={{ backgroundColor: color }}
                  />
                </div>
          
                <label className='option-text'>Rectangle</label>
              </button>
            </div>

            {/* Color picker and Draw tool */}
            <div className="options">
              {/* Color picker */}
              <div className="color-picker">
                <input
                  id="colorPicker"
                  type="color"
                  title="Pick a color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <label className='option-text'>Color</label>
              </div>

              {/* Draw button */}
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

            {/* Line width range */}
            <div className="line-width-container">
              <div className="slider-wrapper">
                <input
                  id="lineWidth"
                  type="range"
                  title="Choose line width"
                  min="1"
                  max="50"
                  value={lineWidth}
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  step="1"
                  className="styled-slider"
                />
                <div 
                  className="line-preview"
                  style={{ width: `${lineWidth}px`, height: `${lineWidth}px` }}
                />
              </div>
              <label className='option-text'>Line Width</label>
            </div>
              
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignTools;

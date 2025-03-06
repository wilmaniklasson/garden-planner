import React, { useState } from 'react';

interface Option {
  name: string;
  img: string;
}

interface OptionsListProps {
  isOpen: boolean;
  selectedTool: string;
  handleSelectTool: (tool: string, svg?: string) => void;
  items: Option[];
}

const OptionsList: React.FC<OptionsListProps> = ({ isOpen, handleSelectTool, items }) => {
  const [selectedSVG, setSelectedSVG] = useState<string | undefined>(undefined);
  
  const handleSVGSelection = (img: string) => {
    if (selectedSVG === img) {
      setSelectedSVG('');
    handleSelectTool('');
  } else {
    setSelectedSVG(img);
    handleSelectTool('svg', img);
  };
}
  return (
    isOpen && (
      <div className='options'>
        {items.map(({ name, img }) => (
          <button
            key={name}
            className={`option-button ${selectedSVG === img ? 'selected' : ''}`}
            onClick={() => handleSVGSelection(img)}
          >
            <div className={`option-image-container ${selectedSVG === img ? 'selected' : ''}`}>
              <img src={img} alt={name} className='option-image' />
            </div>
           
          </button>
        ))}
      </div>
    )
  );
};

export default OptionsList;

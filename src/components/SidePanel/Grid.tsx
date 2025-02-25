import './Options.css';
import { MdGridOn } from 'react-icons/md';
import background from '../../assets/background.svg';
import backgroundIcon from '../../assets/background-icon.svg';
import { useState } from 'react';

interface Grid {
  name: string;
  img: string;
}

const Grid: React.FC = () => {
  const [selectedSVG, setSelectedSVG] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectTool = (tool: string, svg?: string) => {
    console.log(`Selected tool: ${tool}, SVG: ${svg}`);
  };

  const items: Grid[] = [
    { name: 'Grid background', img: background },
  ];

  const handleSVGSelection = (img: string) => {
    if (selectedSVG === img) {
      setSelectedSVG('');
      handleSelectTool('');
    } else {
      setSelectedSVG(img);
      handleSelectTool('svg', img);
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="icon-container" onClick={toggle}>
        <MdGridOn className="icon" size={40} color="#382918" />
        <h2 className="option-name">Background</h2>
      </div>

      {isOpen && (
        <div className="options">
          {items.map(({ name, img }) => (
            <button
              key={name}
              className={`option-button ${selectedSVG === img ? 'selected' : ''}`}
              onClick={() => handleSVGSelection(img)}
            >
              <div className={`option-image-container ${selectedSVG === img ? 'selected' : ''}`}>
                <img src={backgroundIcon} alt={name} className="option-image" />
              </div>
              <p className="option-text">{name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Grid;

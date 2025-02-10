import React from 'react';

interface ControlsProps {
  tool: string;  // Vald verktyg
  setTool: React.Dispatch<React.SetStateAction<string>>;  // Uppdatera valt verktyg
  color: string;  // Vald färg
  setColor: React.Dispatch<React.SetStateAction<string>>;  // Uppdatera vald färg
  selectedSVG: string;  // Vald SVG
  setSelectedSVG: React.Dispatch<React.SetStateAction<string>>;  // FUppdatera vald SVG
  handleExport: () => void;  // Exportera designen
}

const Controls: React.FC<ControlsProps> = ({ tool, setTool, color, setColor, selectedSVG, setSelectedSVG, handleExport }) => {
  return (
    <div className="controls">
      {/* Färgväljare */}
      <label>Färg:</label>
      <input 
        type="color" 
        title="Välj färg" 
        value={color} 
        onChange={(e) => setColor(e.target.value)}
      />

      {/* Verktygsväljare */}
      <label>Verktyg:</label>
      <select 
        title="Verktyg" 
        value={tool} 
        onChange={(e) => setTool(e.target.value)}
      >
        <option value="draw">Rita</option>
        <option value="circle">Lägg ut cirkel</option>
        <option value="rectangle">Lägg ut rektangel</option>
        <option value="svg">Lägg ut SVG</option>
        <option value="edit">Välj</option>
        <option value="delete">Ta bort</option>
      </select>

      {/* Val av svg */}
      <label>Välj SVG:</label>
      <select 
        title="Välj SVG" 
        value={selectedSVG} 
        onChange={(e) => setSelectedSVG(e.target.value)} 
      >
        <option value="/src/assets/images/tree.svg">Träd</option>
        <option value="/src/assets/images/flower.svg">Blomma</option>
        <option value="/src/assets/images/bush.svg">Buske</option>
      </select>

      {/* Exportknapp */}
      <button type="button" onClick={handleExport}>Exportera</button>
    </div>
  );
};

export default Controls;

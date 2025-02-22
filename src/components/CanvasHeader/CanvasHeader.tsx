import './CanvasHeader.css';
import { useCanvasZoomStore } from '../../store/CanvasZoomStore';
import { useEffect, useState } from 'react';

interface CanvasHeaderProps {
  handleExport: () => void;
  saveCanvasToFirebase: () => void;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ handleExport, saveCanvasToFirebase }) => {
  // Get the current scale value from Zustand
  const scale = useCanvasZoomStore(state => state.scale);
  const setScale = useCanvasZoomStore(state => state.setScale);

  const [zoomPercentage, setZoomPercentage] = useState<string>((scale * 100).toFixed(0));

  useEffect(() => {
    // Update the zoom percentage when the scale value changes
    setZoomPercentage((scale * 100).toFixed(0));
  }, [scale]);

  const handleZoom = (zoomIn: boolean) => {
    const scaleBy = 1.05;
    const newScale = zoomIn ? scale * scaleBy : scale / scaleBy;
    setScale(newScale);  // Update the scale value in Zustand
  };

  return (
    <header className="canvas-header">
      <button className='saveCanvasToFirebase' type="button" onClick={saveCanvasToFirebase}>Save Canvas</button>
      <button className="handleExport" type="button" onClick={handleExport}>Export</button>
      <button className="zoom-button" type='button' onClick={() => handleZoom(true)}>+</button>
      <button className="zoom-button" type='button' onClick={() => handleZoom(false)}>−</button>
      <p>Zoom: {zoomPercentage}%</p>
    </header>
  );
};

export default CanvasHeader;

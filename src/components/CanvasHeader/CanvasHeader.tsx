import './CanvasHeader.css';
import { useCanvasZoomStore } from '../../store/CanvasZoomStore';
import { useCanvasStore } from '../../store/CanvasStore';
import { useEffect, useState } from 'react';

interface CanvasHeaderProps {
  handleExport: () => void;
  saveCanvasToFirebase: () => void;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ handleExport, saveCanvasToFirebase }) => {
  // Get the current scale value from Zustand
  const scale = useCanvasZoomStore(state => state.scale);

  const [zoomPercentage, setZoomPercentage] = useState<string>((scale * 100).toFixed(0));

  // Fetch canvas size from CanvasStore to calculate zoom center correctly
  const { canvasSize } = useCanvasStore(); //Zustand

  useEffect(() => {
    // Update the zoom percentage when the scale value changes
    setZoomPercentage((scale * 100).toFixed(0));
  }, [scale]);

  const handleZoom = (zoomIn: boolean) => {
    // Calculate zoom center based on canvasSize
    const stageCenterX = canvasSize.width / 2;
    const stageCenterY = canvasSize.height / 2;

    // Use Zustand's zoom function to adjust zoom and position
    useCanvasZoomStore.getState().zoom(zoomIn, stageCenterX, stageCenterY);
  };

  return (
    <header className="canvas-header">
      <button className='saveCanvasToFirebase' type="button" onClick={saveCanvasToFirebase}>Save</button>
      <button className="handleExport" type="button" onClick={handleExport}>Export</button>
      <button className="zoom-button" type='button' onClick={() => handleZoom(true)}>+</button>
      <button className="zoom-button" type='button' onClick={() => handleZoom(false)}>−</button>
      <p>Zoom: {zoomPercentage}%</p>
    </header>
  );
};

export default CanvasHeader;

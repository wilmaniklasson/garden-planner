
import './CanvasHeader.css';
interface CanvasHeaderProps {
  handleExport: () => void;
  saveCanvasToFirebase: () => void;
  handleZoom: (zoomIn: boolean) => void;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ handleExport, saveCanvasToFirebase, handleZoom }) => {
  return (
    <header className="canvas-header">
      <button className='saveCanvasToFirebase' type="button" onClick={saveCanvasToFirebase}>Save Canvas</button>
      <button className="handleExport" type="button" onClick={handleExport}>Export</button>
      <button className="zoom-button" type='button' onClick={() => handleZoom(true)}>+</button>
      <button className="zoom-button" type='button' onClick={() => handleZoom(false)}>−</button>
    </header>
  );
};

export default CanvasHeader;

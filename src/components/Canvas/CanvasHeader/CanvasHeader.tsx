import './CanvasHeader.css';

interface CanvasHeaderProps {
  handleExport: () => void;
  saveCanvasToFirebase: () => void;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ handleExport, saveCanvasToFirebase }) => {

  return (
    <header className="canvas-header">
      <button className='saveCanvasToFirebase' type="button" onClick={saveCanvasToFirebase}>Save</button>
      <button className="handleExport" type="button" onClick={handleExport}>Export</button>
    </header>
  );
};

export default CanvasHeader;

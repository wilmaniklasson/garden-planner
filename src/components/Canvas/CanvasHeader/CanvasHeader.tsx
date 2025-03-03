
import { useModalStore } from '../../../store/ModalStore';
import './CanvasHeader.css';

interface CanvasHeaderProps {
  handleExport: () => void;
  saveCanvasToFirebase: () => void;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({ handleExport, saveCanvasToFirebase }) => {
  const { openModal } = useModalStore();

  return (
    <header className="canvas-header">
      <button className='saveCanvasToFirebase' type="button" onClick={saveCanvasToFirebase}>Save</button>
      <button className="handleExport" type="button" onClick={handleExport}>Export</button>
      <button onClick={openModal} className="help-button" title="Help">?
      </button>
    </header>
  );
};

export default CanvasHeader;

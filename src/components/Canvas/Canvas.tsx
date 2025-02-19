import './Canvas.css'; 
import { Stage, Layer,Transformer } from 'react-konva';
import { useCanvas } from '../../hooks/useCanvas';
import { useEffect, useRef } from 'react';
import Konva from 'konva'; 
import Controls from '../SidePanel/Controls';
import CanvasHeader from '../CanvasHeader/CanvasHeader';
import { useCanvasStore } from '../../store/canvasStore';
import { useRenderShapes } from '../../hooks/useRenderShapes';


const Canvas: React.FC = () => {
  const { windowSize, stageRef, selectedShapeIndex,} = useCanvasStore(); // Zustand
  const {
    shapes,
    setShapes,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    handleExport,
    saveCanvasToFirebase,
    handleZoom,
  } = useCanvas();
  
  const transformerRef = useRef<Konva.Transformer | null>(null);  // Used to manipulate objects on the canvas

  useEffect(() => {
    // If stageRef or transformerRef doesn't exist or no object is selected, do nothing
    if (!stageRef.current || !transformerRef.current || selectedShapeIndex === null) return;
    
    // Find the selected object based on its index
    const selectedNode = stageRef.current.findOne(`#shape-${selectedShapeIndex}`) as Konva.Node;
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShapeIndex, shapes, stageRef]);

  // Function to handle when an object is dragged (moved)
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, index: number) => {
    // Create a copy of the shapes array and update the position of the dragged object
    const newShapes = [...shapes];
    newShapes[index] = {
      ...newShapes[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setShapes(newShapes);  // Update state with the new positions
  };

  const renderShapes = useRenderShapes();
  const aspectRatio = 2600 / 1548;
  const canvasWidth = windowSize.width * 0.7; // Calculate canvas width based on window size
  const canvasHeight = canvasWidth / aspectRatio;  // Calculate canvas height based on aspect ratio


  return (
    <div className="canvas-container">
      {/* Control panel with tools and settings */}
      <Controls/>
      
 <div className="main-content">
      <CanvasHeader 
        handleExport={handleExport}
        saveCanvasToFirebase={() => saveCanvasToFirebase(shapes)}
        handleZoom={handleZoom}
      />
        {/* Konva Stage component (canvas area) */}
        <Stage className='canvas'
          width={canvasWidth} // Use calculated canvasWidth
          height={canvasHeight} // Use calculated canvasHeight
          onMouseDown={handleMouseDown}  // Track mouse down
          onTouchStart={handleMouseDown}  // Track touch start
          onMouseMove={handleMouseMove}  // Track mouse move
          onTouchMove={handleMouseMove}  // Track touch move
          onMouseUp={handleMouseUp}  // Track mouse up
          onTouchEnd={handleMouseUp}  // Track touch end
          ref={stageRef}  // Reference to the Konva stage
          saveCanvasToFirebase={saveCanvasToFirebase}
        >
          <Layer className="canvas-layer">
            {renderShapes(shapes, handleDelete, handleDragEnd)}
            {selectedShapeIndex !== null && <Transformer ref={transformerRef} touchEnabled={true} />}
          </Layer>
        </Stage>
        </div>
     
    </div>
  );
};

export default Canvas;

import './Canvas.css'; 
import { Stage, Layer,Transformer, Rect } from 'react-konva';
import { useCanvas } from '../../hooks/useCanvas';
import { useEffect, useRef } from 'react';
import Konva from 'konva'; 
import CanvasHeader from '../CanvasHeader/CanvasHeader';
import { useCanvasStore } from '../../store/CanvasStore';
import { useRenderShapes } from '../../hooks/useRenderShapes';
import { useCanvasZoomStore } from '../../store/CanvasZoomStore';


const Canvas: React.FC = () => {
  const { scale, x, y} = useCanvasZoomStore();
  const { windowSize, stageRef, selectedShapeIndex, setSelectedShapeIndex} = useCanvasStore(); // Zustand
  const {
    shapes,
    setShapes,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    handleExport,
    saveCanvasToFirebase,
  } = useCanvas();
  
  const transformerRef = useRef<Konva.Transformer | null>(null);  // Used to manipulate objects on the canvas
  const handleDeselect = () => {
    setSelectedShapeIndex(null);
  };
  

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
  const canvasWidth = (windowSize.width) ; // Calculate canvas width based on scale'
  const canvasHeight = canvasWidth / aspectRatio;  // Calculate canvas height based on aspect ratio

  const { setCanvasSize } = useCanvasStore();  // Get canvasSize from Zustand

  // Get stageRef from Zustand

  useEffect(() => {
    if (stageRef.current) {
      // Use getWidth and getHeight methods for Konva Stage instance
      const width = stageRef.current.width();
      const height = stageRef.current.height();

      // Set the size in state
      setCanvasSize({ width, height });

      // Log the size
      console.log(`Canvas Stage - Width: ${width}, Height: ${height}`);
    }
  }, [stageRef]);  // Runs when stageRef changes


  return (
    <div className="canvas-container">
        {/* Konva Stage component (canvas area) */}
        <Stage className='canvas-stage'
        scaleX={scale}  // Apply scale from zustand
        scaleY={scale}  // Apply scale from zustand
        x={x}  // Apply position from zustand
        y={y}  // Apply position from zustand
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
          <Rect
              width={canvasWidth}
              height={canvasHeight}
              fill="transparent"
              onClick={handleDeselect}
              onTap={handleDeselect}
            />
            {renderShapes(shapes, handleDelete, handleDragEnd)}
            {selectedShapeIndex !== null && <Transformer ref={transformerRef} touchEnabled={true} />}
          </Layer>
        </Stage>
        <CanvasHeader 
        handleExport={handleExport}
        saveCanvasToFirebase={() => saveCanvasToFirebase(shapes)}
      />

     
    </div>
  );
};

export default Canvas;


import './Canvas.css';
import { Stage, Layer, Transformer, Rect } from 'react-konva';
import { useCanvas } from '../../hooks/useCanvas';
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva'; 
import { useCanvasStore } from '../../store/CanvasStore';
import { useRenderShapes } from '../../hooks/useRenderShapes';
import { useCanvasZoomStore } from '../../store/CanvasZoomStore';
import CanvasActions from '../CanvasActions/CanvasActions';
import CanvasHeader from './CanvasHeader/CanvasHeader';

const Canvas: React.FC = () => {
  const { scale, x, y } = useCanvasZoomStore();
  const { stageRef, selectedShapeIndex, setSelectedShapeIndex, setCanvasSize } = useCanvasStore();
  const { shapes, setShapes, handleMouseDown, handleMouseMove, handleMouseUp, handleDelete, handleExport, saveCanvasToFirebase } = useCanvas();
  
  const transformerRef = useRef<Konva.Transformer | null>(null);
  
  const [canvasSize, setCanvasSizeState] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSizeState({ width: window.innerWidth, height: window.innerHeight });
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight }); // Uppdatera Zustand
    };

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [setCanvasSize]);

  useEffect(() => {
    if (!stageRef.current || !transformerRef.current || selectedShapeIndex === null) return;
    
    const selectedNode = stageRef.current.findOne(`#shape-${selectedShapeIndex}`) as Konva.Node;
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShapeIndex, shapes, stageRef]);

  const handleDeselect = () => setSelectedShapeIndex(null);
  
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, index: number) => {
    const newShapes = [...shapes];
    newShapes[index] = { ...newShapes[index], x: e.target.x(), y: e.target.y() };
    setShapes(newShapes);
  };

  const renderShapes = useRenderShapes();

  return (
    <div className="canvas-container">
      <CanvasHeader handleExport={handleExport} saveCanvasToFirebase={() => saveCanvasToFirebase(shapes)} />
      <Stage
        className='canvas-stage'
        scaleX={scale}
        scaleY={scale}
        x={x}
        y={y}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <Rect
            width={canvasSize.width}
            height={canvasSize.height}
            fill="transparent"
            onClick={handleDeselect}
            onTap={handleDeselect}
          />
          {renderShapes(shapes, handleDelete, handleDragEnd)}
          {selectedShapeIndex !== null && <Transformer ref={transformerRef} touchEnabled={true} />}
        </Layer>
      </Stage>
      <CanvasActions/>
    </div>
  );
};

export default Canvas;

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
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight }); // Update Zustand
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
  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    if (selectedShapeIndex === null) return;
  
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
  
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedShapeIndex
          ? {
              ...shape,
              x: node.x(),
              y: node.y(),
              rotation: node.rotation(),
              // circle: update radius
              ...(shape.tool === 'rect' && shape.width && shape.height
                ? { width: shape.width * scaleX, height: shape.height * scaleY }
                : {}),
              ...(shape.tool === 'circle' && shape.radius
                ? { radius: shape.radius * scaleX }
                : {}),
              ...(shape.tool === 'circle-grass' && shape.radius
                ? { radius: shape.radius * scaleX }
                : {}),
                // rect: update width and height
              ...(shape.tool === 'rect-grass' && shape.width && shape.height
                ? { width: shape.width * scaleX, height: shape.height * scaleY }
                : {}),
              ...(shape.tool === 'garden-bed' && shape.width && shape.height
                ? { width: shape.width * scaleX, height: shape.height * scaleY }
                : {}),
              ...(shape.tool === 'grid' && shape.width && shape.height
                ? { width: shape.width * scaleX, height: shape.height * scaleY }
                : {}),
              // SVG: update width and height
              ...(shape.tool === 'svg' && shape.width && shape.height
                ? { width: shape.width * scaleX, height: shape.height * scaleY }
                : {}),
            }
          : shape
      )
    );
  
    // reset scale
    node.scaleX(1);
    node.scaleY(1);
  };

  useEffect(() => {
    if (!transformerRef.current) return;
  
    transformerRef.current.on("transformend", () => {
      const nodes = transformerRef.current?.nodes();
      if (!nodes) return;
  
      nodes.forEach(node => {
        console.log(`Shape resized: ID=${node.id()}, New Width=${node.width()}, New Height=${node.height()}`);
      });
    });
  }, []);
  
  

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
          {selectedShapeIndex !== null && <Transformer ref={transformerRef} touchEnabled={true} onTransformEnd={handleTransformEnd}/>}
        </Layer>
      </Stage>
      <CanvasActions/>
    </div>
  );
};

export default Canvas;

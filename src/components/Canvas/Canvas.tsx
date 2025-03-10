import { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Transformer, Rect } from 'react-konva';
import { useCanvas } from '../../hooks/useCanvas';
import { useRenderShapes } from '../../hooks/useRenderShapes';
import { useCanvasStore } from '../../store/CanvasStore';
import { useCanvasZoomStore } from '../../store/CanvasZoomStore';
import CanvasHeader from './CanvasHeader/CanvasHeader';
import HelpModal from '../HelpModal/HelpModal';


const Canvas = () => {
  const { scale, x, y } = useCanvasZoomStore(); // Zustand
  const { stageRef, selectedShapeIndex, canvasSize} = useCanvasStore(); // zustand
  const handleWheelZoom = useCanvasZoomStore(state => state.handleWheelZoom); // Zustand

    
  // From hook useCanvas
  const {
      shapes,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleDelete,
      handleExport,
      saveCanvasToFirebase,
      handleDeselect,
      handleTransformEnd,
      handleDragEnd,
      useUpdateTransformer,
      useLogShapeResize,
    } = useCanvas();
  
    // Ref for the transformer
    const transformerRef = useRef<Konva.Transformer | null>(null);
  
    // Call the custom hooks for transformer updates and resizing logging
    useUpdateTransformer();
    useLogShapeResize();

    useEffect(() => {
      if (!stageRef.current || !transformerRef.current) return;
    
      const transformer = transformerRef.current;
      
      if (selectedShapeIndex === null) {
        transformer.nodes([]); 
        transformer.getLayer()?.batchDraw();
        return;
      }
    
      const selectedNode = stageRef.current.findOne(`#shape-${selectedShapeIndex}`) as Konva.Node;
      
      if (selectedNode) {
        transformer.nodes([selectedNode]);
        transformer.getLayer()?.batchDraw();
      }
    }, [selectedShapeIndex, shapes, stageRef]);

  const renderShapes = useRenderShapes();


  
  return (
    <div className="canvas-container">
      <CanvasHeader handleExport={handleExport} saveCanvasToFirebase={() => saveCanvasToFirebase(shapes)} />
      <div onWheel={handleWheelZoom}>
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
          <Transformer ref={transformerRef} touchEnabled={true} onTransformEnd={handleTransformEnd}/>
        </Layer>
      </Stage>
      </div>
      <HelpModal />
      
    </div>
  );
};

export default Canvas;

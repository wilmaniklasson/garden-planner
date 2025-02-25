import { useState } from 'react';
import { useCanvasToolsStore } from '../store/CanvasToolsStore';
import { useCanvasStore } from '../store/CanvasStore';
import { createShape } from '../utils/canvasTools';
import { Shape, ToolType } from '../utils/shapes';
import Konva from 'konva';

export const useCanvasEvents = () => {
  const { tool, color, lineWidth, SVG } = useCanvasToolsStore() as { tool: ToolType, color: string, lineWidth: number, SVG: string }; // Zustand
  const { shapes,setShapes, selectedShapeIndex, addShape, removeShape, stageRef, isDrawing, setIsDrawing, setSelectedShapeIndex } = useCanvasStore(); // Zustand
 
  // State for dragging around the canvas
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number, y: number } | null>(null);

  const handleMouseDown = async () => {
    if (!stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    if (tool === "move-canvas") {
      setIsDragging(true);
      setLastPos(pos);
      return;
    }

    const clickedShape = stage.getIntersection(pos);
    if (clickedShape) {
      const node = clickedShape;
      const index = shapes.findIndex((shape) => shape.id === node.id());
      if (index !== -1) {
        setSelectedShapeIndex(index);
        return;
      }
    }

    const newShape = await createShape(tool, pos, color, lineWidth, SVG);
  if (newShape) {
    addShape(newShape);
    if (tool === 'line') setIsDrawing(true);
  }
};

  const handleMouseMove = () => {
    if (!stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    // Move the canvas if we are dragging
    if (isDragging && lastPos) {
      const dx = pos.x - lastPos.x;
      const dy = pos.y - lastPos.y;
      stage.position({
        x: stage.x() + dx,
        y: stage.y() + dy,
      });
      stage.batchDraw();
      setLastPos(pos); // Update last position
    }
    
    if (isDrawing && tool === 'line') {
      const lastShape = shapes[shapes.length - 1]; 
      if (lastShape?.points) {
        lastShape.points = [...lastShape.points, pos.x, pos.y];  
        addShape(lastShape);
      }
    }
  };
    


  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDragging(false);
  };

  const handleDelete = (index: number) => {
    removeShape(index); 
  };

  // Handle the end of a drag event
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
  
    const updatedShape = (shape: Shape) => ({
      ...shape,
      x: node.x(),
      y: node.y(),
      rotation: node.rotation(),
      ...(shape.width && shape.height ? { width: shape.width * scaleX, height: shape.height * scaleY } : {}),
      ...(shape.radius ? { radius: shape.radius * scaleX } : {}),
    });
  
    const updatedShapes = [...shapes];
    updatedShapes[selectedShapeIndex] = updatedShape(shapes[selectedShapeIndex]);
  
    // Set the new shapes state
    setShapes(updatedShapes);
  
  
    // reset scale
    node.scaleX(1);
    node.scaleY(1);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    handleDragEnd,
    handleTransformEnd,
  };
};

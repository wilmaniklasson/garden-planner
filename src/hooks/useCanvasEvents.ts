import { useState } from 'react';
import { useCanvasToolsStore } from '../store/CanvasToolsStore';
import { useCanvasStore } from '../store/CanvasStore';
import { createShape } from '../utils/canvasTools';
import { Shape, ToolType } from '../utils/shapes';

export const useCanvasEvents = (
  shapes: Shape[],
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) => {
  const { tool, color, lineWidth, SVG } = useCanvasToolsStore() as { tool: ToolType, color: string, lineWidth: number, SVG: string }; // Zustand
  const { stageRef, isDrawing, setIsDrawing, setSelectedShapeIndex } = useCanvasStore(); // Zustand
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
      setShapes((prevShapes) => [...prevShapes, newShape]);
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

    // Draw the line if we are drawing
    if (isDrawing && tool === 'line') {
      setShapes((prevShapes) => {
        const lastShape = prevShapes[prevShapes.length - 1];
        if (lastShape?.points) {
          lastShape.points = [...lastShape.points, pos.x, pos.y];
        }
        return [...prevShapes];
      });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDragging(false);
  };

  const handleDelete = (index: number) => {
    setShapes((prevShapes) => prevShapes.filter((_, i) => i !== index));
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
  };
};

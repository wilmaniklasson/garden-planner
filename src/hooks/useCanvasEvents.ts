// /hooks/useCanvasEvents.ts
import { useState } from 'react';
import { Shape, ToolType, loadImage } from '../utils/shapes';
import Konva from 'konva';

export const useCanvasEvents = (
  tool: string, 
  shapes: Shape[], 
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, 
  stageRef: React.RefObject<Konva.Stage>, 
  isDrawing: boolean, 
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>, 
  selectedSVG: string,
  color: string,
  lineWidth: number,
) => {
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);

  const handleMouseDown = async () => {
    if (!stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;
    
    const clickedShape = stage.getIntersection(pos);
    if (clickedShape) {
      const node = clickedShape;
      const index = shapes.findIndex((shape) => shape.id === node.id());
      if (index !== -1) {
        setSelectedShapeIndex(index);
        return; // Skip creating a new shape
      }
    }

    if (tool === "edit") return;

    let newShape: Shape | null = null;
    switch (tool) {
      case 'draw':
        newShape = { id: Date.now().toString(), tool: ToolType.Line, points: [pos.x, pos.y], color: color, lineWidth: lineWidth, };
        setIsDrawing(true);
        break;
      case 'circle':
        newShape = { id: Date.now().toString(), tool: ToolType.Circle , x: pos.x, y: pos.y, color: color, radius: 30 };
        break;
      case 'rectangle':
        newShape = { id: Date.now().toString(), tool: ToolType.Rect , x: pos.x, y: pos.y, color: color, width: 80, height: 80 };
        break;
      case 'svg': {
        const img = await loadImage(selectedSVG);
        newShape = { id: Date.now().toString(), tool: ToolType.SVG, x: pos.x, y: pos.y, image: img };
        break;
      }
      case 'circle-grass': {
        newShape = { id: Date.now().toString(), 
          tool: ToolType.CircleGrass, 
          x: pos.x, 
          y: pos.y, 
          radius: 80,
          color: 'rgba(76, 175, 80, 0.6)',
          gradient: {
            startColor: 'rgba(76, 175, 80, 0.6)',
            endColor: 'rgba(56, 142, 60, 0.6)',
          },
        };
        break;
      }
      case 'rect-grass': {
        newShape = { id: Date.now().toString(), tool: ToolType.RectGrass, x: pos.x, y: pos.y, color: 'rgba(76, 175, 80, 0.6)', width: 130, height: 90 };
        break;
    }
    }

    if (newShape) setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  const handleMouseMove = () => {
    if (!isDrawing || tool !== 'draw' || !stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setShapes((prevShapes) => {
      const lastShape = prevShapes[prevShapes.length - 1];
      if (lastShape?.points) {
        lastShape.points = [...lastShape.points, pos.x, pos.y];
      }
      return [...prevShapes];
    });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleDelete = (index: number) => {
    setShapes((prevShapes) => prevShapes.filter((_, i) => i !== index));
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    selectedShapeIndex,
    setSelectedShapeIndex
  };
};


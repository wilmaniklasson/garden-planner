// /hooks/useCanvasEvents.ts
import { useState } from 'react';
import { Shape, loadImage } from '../utils/shapes';
import Konva from 'konva';

export const useCanvasEvents = (tool: string, shapes: Shape[], setShapes: React.Dispatch<React.SetStateAction<Shape[]>>, stageRef: React.RefObject<Konva.Stage>, isDrawing: boolean, setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>, selectedSVG: string) => {
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
        newShape = { id: Date.now().toString(), tool: 'line', points: [pos.x, pos.y], color: '#ff0000', lineWidth: 3 };
        setIsDrawing(true);
        break;
      case 'circle':
        newShape = { id: Date.now().toString(), tool: 'circle', x: pos.x, y: pos.y, color: '#ff0000', radius: 30 };
        break;
      case 'rectangle':
        newShape = { id: Date.now().toString(), tool: 'rect', x: pos.x, y: pos.y, color: '#ff0000', width: 80, height: 80 };
        break;
      case 'svg': {
        const img = await loadImage(selectedSVG);
        newShape = { id: Date.now().toString(), tool: 'svg', x: pos.x, y: pos.y, image: img };
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

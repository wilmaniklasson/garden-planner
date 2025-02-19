import { useCanvasToolsStore } from '../store/CanvasToolsStore';
import { useCanvasStore } from '../store/canvasStore';
import { createShape } from '../utils/canvasTools';
import { Shape, ToolType } from '../utils/shapes';

export const useCanvasEvents = (
  shapes: Shape[],
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) => {
  const { tool, color, lineWidth, SVG } = useCanvasToolsStore() as { tool: ToolType, color: string, lineWidth: number, SVG: string }; // Zustand
  const { stageRef, isDrawing, setIsDrawing, setSelectedShapeIndex } = useCanvasStore(); // Zustand

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
        return;
      }
    }

    if (tool === "edit") return;

    const newShape = await createShape(tool, pos, color, lineWidth, SVG);
    if (newShape) {
      setShapes((prevShapes) => [...prevShapes, newShape]);
      if (tool === 'line') setIsDrawing(true);
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing || tool !== 'line' || !stageRef.current) return;
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
  };
};

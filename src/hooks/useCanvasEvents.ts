import { useState } from 'react';
import { useCanvasToolsStore } from '../store/CanvasToolsStore';
import { useCanvasStore } from '../store/CanvasStore';
import { createShape } from '../utils/canvasTools';
import { Shape, ToolType } from '../utils/shapes';
import Konva from 'konva';

export const useCanvasEvents = () => {
  // Zustand state
  const { tool, color, lineWidth, SVG } = useCanvasToolsStore() as { tool: ToolType, color: string, lineWidth: number, SVG: string }; 
  const { shapes,setShapes, selectedShapeIndex, addShape, removeShape, stageRef, isDrawing, setIsDrawing, setSelectedShapeIndex } = useCanvasStore();

  // State for dragging around the canvas
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number, y: number } | null>(null);
  // State for the copied shape
  const [copiedShape, setCopiedShape] = useState<Shape | null>(null);



   // Handle the mouse down event
  const handleMouseDown = async () => {
    if (!stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;


    // If the tool is "move-canvas", the can be dragged
    if (tool === "move-canvas") {
      setIsDragging(true);
      setLastPos(pos);
      return;
    }

    // Find the shape that the user clicked on
    const clickedShape = stage.getIntersection(pos);
    if (clickedShape) {
      const node = clickedShape;
      const index = shapes.findIndex((shape) => shape.id === node.id());
      if (index !== -1) {
        setSelectedShapeIndex(index);
        return;
      }
    }

    // Create a new shape based on the
    const newShape = await createShape(tool, pos, color, lineWidth, SVG);
  if (newShape) {
    addShape(newShape);
    if (tool === 'line') setIsDrawing(true);
  }
};


/*________ Handle the mouse move event___________*/
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
    
    // If we are drawing a line, update the line's points
    if (isDrawing && tool === 'line') {
      const lastShape = shapes[shapes.length - 1]; 
      if (lastShape?.points) {
        lastShape.points = [...lastShape.points, pos.x, pos.y];  
        const newShapes = [...shapes];
        newShapes[shapes.length - 1] = lastShape;
        setShapes(newShapes);
      }
    }
  };

  
 /* ____Handle the mouse up event___ */
  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDragging(false);
  };



   /* _______ Delete the selected shape_______ */
  const handleDelete = (index: number) => {
    removeShape(index); 
  };


  /* _______Copy paste functionality_______ */
  const handleCopy = () => {
    if (selectedShapeIndex === null || selectedShapeIndex === undefined) return;

    const shapeToCopy = shapes[selectedShapeIndex];
    setCopiedShape({ ...shapeToCopy }); // save the shape to the copiedShape state
  };

  // paste the copied shape
  const handlePaste = () => {
    if (!copiedShape) return;

    // Create a new shape with the copied shape's properties
    const newShape: Shape = {
      ...copiedShape,
      id: `${copiedShape.id}-paste`,  // give the new shape a unique ID
      // Move the position to not collide with the original shape
      x: (copiedShape.x ?? 0) + 20, 
      y: (copiedShape.y ?? 0) + 20,  
    };

    addShape(newShape);  // Add the new shape to the shapes array
    setSelectedShapeIndex(shapes.length);  // Select the new shape
  };



   /* _______ Handle the end of a drag event_______ */
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, index: number) => {
    const newShapes = [...shapes];
    newShapes[index] = { ...newShapes[index], x: e.target.x(), y: e.target.y() };
    setShapes(newShapes);
  };

  // Handle the end of a transform event
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
    handleCopy,
    handlePaste,
    copiedShape,
  };
};

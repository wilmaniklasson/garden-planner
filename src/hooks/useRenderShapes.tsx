import { Line, Circle, Rect, Image } from 'react-konva';
import Konva from 'konva';
import { Shape } from '../utils/shapes';
import { useCanvasToolsStore } from '../store/CanvasToolsStore';
import { useCanvasStore } from '../store/canvasStore';

export const useRenderShapes = () => {
  const { tool } = useCanvasToolsStore(); // Zustand
  const { setSelectedShapeIndex } = useCanvasStore(); // Zustand

  return (shapes: Shape[], handleDelete: (index: number) => void, handleDragEnd: (e: Konva.KonvaEventObject<DragEvent>, index: number) => void) => {
       {/* Render all shapes stored in state */}
    return shapes.map((shape, index) => {
        // Common properties applied to each shape
      const shapeProps = {
        draggable: true, // Make each shape draggable
        onClick: () => {
          if (tool === 'delete') handleDelete(index); // Delete the shape if Delete is active for desktop
          if (tool === 'edit') setSelectedShapeIndex(index); // Select the shape if Edit is active for desktop
        },
        onTap: () => {
          if (tool === 'delete') handleDelete(index); // Delete the shape if Delete is active for mobile
        },
        onDblClick: () => {
          if (tool !== 'delete') setSelectedShapeIndex(index); // Select the shape if Delete is not active and the shape is double clicked for desktop
          if (tool === 'edit') setSelectedShapeIndex(index); // Select the shape if Edit is active for mobile
        },
        onDblTap: () => {
          if (tool !== 'delete') setSelectedShapeIndex(index);
        },
        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(e, index), // Handle drag end
        id: `shape-${index}`, // Set a unique ID for each shape
      };
      // Render different Konva components depending on the shape type
      switch (shape.tool) {
        case 'line':
          return <Line key={index} {...shapeProps} points={shape.points || []} stroke={shape.color} strokeWidth={shape.lineWidth || 3} lineCap="round" lineJoin="round" />;
        case 'circle':
          return <Circle key={index} {...shapeProps} x={shape.x} y={shape.y} radius={shape.radius || 50} fill={shape.color} />;
        case 'rect':
          return <Rect key={index} {...shapeProps} x={shape.x} y={shape.y} width={shape.width || 100} height={shape.height || 100} fill={shape.color} />;
        case 'svg':
          return shape.image && typeof shape.image !== 'string' ? <Image key={index} {...shapeProps} x={shape.x} y={shape.y} image={shape.image} width={70} height={70} /> : null;
        case 'circle-grass':
          return <Circle key={index} {...shapeProps} x={shape.x} y={shape.y} radius={shape.radius || 50} fill={shape.color} />;
        case 'rect-grass':
          return <Rect key={index} {...shapeProps} x={shape.x} y={shape.y} width={shape.width || 100} height={shape.height || 100} fill={shape.color} />;
        default:
          return null;
      }
    });
  };
};
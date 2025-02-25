import { Line, Circle, Rect, Image } from 'react-konva';
import Konva from 'konva';
import { Shape } from '../utils/shapes';
import { useCanvasToolsStore } from '../store/CanvasToolsStore';
import { useCanvasStore } from '../store/CanvasStore';

export const useRenderShapes = () => {
  const { tool } = useCanvasToolsStore();
  const { setSelectedShapeIndex, selectedShapeIndex } = useCanvasStore();

  return (shapes: Shape[], handleDelete: (index: number) => void, handleDragEnd: (e: Konva.KonvaEventObject<DragEvent>, index: number) => void) => {
    return shapes.map((shape, index) => {
      const draggable = tool !== 'move-canvas';

      const shapeProps = {
        draggable, // Make the shape draggable unless 'move-canvas' is selected
        id: `shape-${index}`, // Unique ID for each shape
        strokeWidth: selectedShapeIndex === index ? 2 : 1, // Adjust stroke width if selected
        stroke: selectedShapeIndex === index ? 'rgb(0, 229, 255)' : undefined, // Highlight selected shape

      
        // EVENTS FOR DESKTOP:
        onClick: () => {
          if (tool === 'delete') handleDelete(index); // Delete shape when clicked (if delete tool is active)
          if (tool === 'transform') setSelectedShapeIndex(index); // Select shape when clicked (if edit tool is active)
        },
        onDblClick: () => {
          if (tool !== 'delete') setSelectedShapeIndex(index); // Select shape when double-clicked (if not in delete mode)
        },
      
        // EVENTS FOR MOBILE:
        onTap: () => {
          if (tool === 'delete') handleDelete(index); // Delete shape when tapped (if delete tool is active)
        },
        onDblTap: () => {
          if (tool !== 'delete') setSelectedShapeIndex(index); // Select shape when double-tapped (if not in delete mode)
        },
      
        // COMMON EVENT FOR BOTH:
        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(e, index), // Handle drag end for both desktop & mobile
      };
      

      switch (shape.tool) {
        case 'line':
          return (
            <Line
              key={index}
              {...shapeProps}
              points={shape.points || []}
              stroke={shape.color}
              strokeWidth={shape.lineWidth || 3}
              lineCap="round"
              lineJoin="round"
            />
          );
        case 'circle':
        case 'circle-grass':
        case 'circle-garden-bed':
          return (
            <Circle
              key={index}
              {...shapeProps}
              x={shape.x}
              y={shape.y}
              radius={shape.radius || 50}
              fill={shape.color}
              rotation={shape.rotation || 0}
            />
          );
        case 'rect':
        case 'rect-grass':
        case 'garden-bed':
        case 'grid':
          return (
            <Rect
              key={index}
              {...shapeProps}
              x={shape.x}
              y={shape.y}
              width={shape.width || 100}
              height={shape.height || 100}
              fill={shape.color}
              rotation={shape.rotation || 0}
            />
          );
        case 'svg':
          return shape.image && typeof shape.image !== 'string' ? (
            <Image
              key={index}
              {...shapeProps}
              x={shape.x}
              y={shape.y}
              image={shape.image}
              width={shape.width || 100}
              height={shape.height || 100}
              rotation={shape.rotation || 0}
            />
          ) : null;
        default:
          return null;
      }
    });
  };
};
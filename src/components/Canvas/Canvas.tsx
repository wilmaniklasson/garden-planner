import './Canvas.css'; 
import { Stage, Layer, Line, Image, Rect, Circle, Transformer } from 'react-konva';
import { useCanvas } from '../../hooks/useCanvas';
import { useEffect, useRef } from 'react';
import Konva from 'konva'; 
import Controls from '../SidePanel/Controls';
import CanvasHeader from '../CanvasHeader/CanvasHeader';
import { useCanvasToolsStore } from '../../store/CanvasToolsStore';
import { useCanvasStore } from '../../store/canvasStore';


const Canvas: React.FC = () => {
  const { tool } = useCanvasToolsStore(); 
  const { windowSize, stageRef,} = useCanvasStore();
  const {
    shapes,
    setShapes,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    selectedShapeIndex,
    setSelectedShapeIndex,
    handleExport,
    saveCanvasToFirebase,
    handleZoom,
  } = useCanvas();
  
  const transformerRef = useRef<Konva.Transformer | null>(null);  // Used to manipulate objects on the canvas

  useEffect(() => {
    // If stageRef or transformerRef doesn't exist or no object is selected, do nothing
    if (!stageRef.current || !transformerRef.current || selectedShapeIndex === null) return;
    
    // Find the selected object based on its index
    const selectedNode = stageRef.current.findOne(`#shape-${selectedShapeIndex}`) as Konva.Node;
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShapeIndex, shapes, stageRef]);

  // Function to handle when an object is dragged (moved)
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, index: number) => {
    // Create a copy of the shapes array and update the position of the dragged object
    const newShapes = [...shapes];
    newShapes[index] = {
      ...newShapes[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setShapes(newShapes);  // Update state with the new positions
  };

  const aspectRatio = 2600 / 1548;
const canvasWidth = windowSize.width * 0.7; // Calculate canvas width based on window size
const canvasHeight = canvasWidth / aspectRatio;  // Calculate canvas height based on aspect ratio



  return (
    <div className="canvas-container">
      {/* Control panel with tools and settings */}
      <Controls/>
      
 <div className="main-content">
      <CanvasHeader 
        handleExport={handleExport}
        saveCanvasToFirebase={() => saveCanvasToFirebase(shapes)}
        handleZoom={handleZoom}
      />
  
   

        {/* Konva Stage component (canvas area) */}
        <Stage className='canvas'
          width={canvasWidth} // Use calculated canvasWidth
          height={canvasHeight} // Use calculated canvasHeight
          onMouseDown={handleMouseDown}  // Track mouse down
          onTouchStart={handleMouseDown}  // Track touch start
          onMouseMove={handleMouseMove}  // Track mouse move
          onTouchMove={handleMouseMove}  // Track touch move
          onMouseUp={handleMouseUp}  // Track mouse up
          onTouchEnd={handleMouseUp}  // Track touch end
          ref={stageRef}  // Reference to the Konva stage
          saveCanvasToFirebase={saveCanvasToFirebase}
        >
          <Layer className="canvas-layer">
            {/* Render all shapes stored in state */}
            {shapes.map((shape, index) => {
              // Common properties applied to each shape
              const shapeProps = {
                draggable: true,  // Make each shape draggable
                onClick: () => {
                  if (tool === 'delete') {
                    handleDelete(index);  // Delete the shape if Delete is active for desktop
                  }
                  if (tool === 'edit') {
                    setSelectedShapeIndex(index);  // Select the shape if Edit is active for desktop
                  }
                },

                onTap: () => {
                  if (tool === 'delete') {
                 handleDelete(index);  // Delete the shape if Delete is active for mobile
                  }
                  },
              
                onDblClick: () => {
                  if (tool !== 'delete') {
                    setSelectedShapeIndex(index);  // Select the shape if Delete is not active and the shape is double clicked for desktop
                  }
                  if (tool === 'edit') {
                    setSelectedShapeIndex(index);  // Select the shape if Edit is active for mobile
                  }
                
                },
               
                onDblTap: () => {
                  if (tool !== 'delete') {
                    setSelectedShapeIndex(index);  // Select the shape if Delete is not active and the shape is double clicked for mobile
                  }
                },
                onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(e, index),  // Handle drag end
                id: `shape-${index}`,  // Set a unique ID for each shape
              };

              // Render different Konva components depending on the shape type (line, circle, rect, svg)
              switch (shape.tool) {
                case 'line':
                  return <Line key={index} {...shapeProps} points={shape.points} stroke={shape.color} strokeWidth={shape.lineWidth} lineCap="round" lineJoin="round" />;
                case 'circle':
                  return <Circle key={index} {...shapeProps} x={shape.x} y={shape.y} radius={shape.radius} fill={shape.color} />;
                case 'rect':
                  return <Rect key={index} {...shapeProps} x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.color} />;
                case 'svg':
                  return shape.image && typeof shape.image !== 'string' ? <Image key={index} {...shapeProps} x={shape.x} y={shape.y} image={shape.image} width={150} height={170} /> : null;
                  case 'circle-grass':
                  return <Circle key={index} {...shapeProps} x={shape.x} y={shape.y} radius={shape.radius} fill={shape.color} />;
                case 'rect-grass':
                  return <Rect key={index} {...shapeProps} x={shape.x} y={shape.y} width={shape.width} height={shape.height} fill={shape.color} />;
                default:
                  return null;  // If no type matches, render nothing
              }
            })}
            {/* If a shape is selected, render Transformer to allow user manipulation */}
            {selectedShapeIndex !== null && (
              <Transformer ref={transformerRef} 
              touchEnabled={true} />
            )}
          </Layer>
        </Stage>
        </div>
     
    </div>
  );
};

export default Canvas;

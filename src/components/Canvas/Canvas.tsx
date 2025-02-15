import './Canvas.css'; 
import { Stage, Layer, Line, Image, Rect, Circle, Transformer } from 'react-konva';
import { useCanvas } from './useCanvas';
import { useEffect, useRef } from 'react';
import Konva from 'konva'; 
import Controls from './Controls';

const Canvas: React.FC = () => {
  const {
    tool,
    setTool,
    color,
    setColor,
    shapes,
    setShapes,
    selectedSVG,
    setSelectedSVG,
    windowSize,
    stageRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    selectedShapeIndex,
    setSelectedShapeIndex,
    lineWidth,
    setLineWidth,
    handleExport,
    saveCanvasToFirebase,
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

  return (
    <div className="canvas">
      {/* Control panel with tools and settings */}
      <Controls 
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        selectedSVG={selectedSVG}
        setSelectedSVG={setSelectedSVG}
        handleExport={handleExport}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        saveCanvasToFirebase={() => saveCanvasToFirebase(shapes)}
      />

      <div id="canvas-wrapper" style={{ width: `${windowSize.width * 0.7}px`, height: `${windowSize.height * 0.8}px` }}>
        {/* Konva Stage component (canvas area) */}
        <Stage
          width={windowSize.width * 0.7}
          height={windowSize.height * 0.8}
          onMouseDown={handleMouseDown}  // Track mouse down
          onMouseMove={handleMouseMove}  // Track mouse move
          onMouseUp={handleMouseUp}  // Track mouse up
          ref={stageRef}  // Reference to the Konva stage
          saveCanvasToFirebase={saveCanvasToFirebase}
        >
          <Layer>
            {/* Render all shapes stored in state */}
            {shapes.map((shape, index) => {
              // Common properties applied to each shape
              const shapeProps = {
                draggable: true,  // Make each shape draggable
                onClick: () => {
                  if (tool === 'delete') {
                    handleDelete(index);  // Remove shape if "delete" is selected
                  } else {
                    setSelectedShapeIndex(index);  // Select the shape if no "delete" is selected
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
                  return shape.image && typeof shape.image !== 'string' ? <Image key={index} {...shapeProps} x={shape.x} y={shape.y} image={shape.image} width={80} height={80} /> : null;
                default:
                  return null;  // If no type matches, render nothing
              }
            })}
            {/* If a shape is selected, render Transformer to allow user manipulation */}
            {selectedShapeIndex !== null && (
              <Transformer ref={transformerRef} />
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;

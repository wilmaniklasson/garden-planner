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
  } = useCanvas();
  
  const transformerRef = useRef<Konva.Transformer | null>(null);  // Används för att manipulera objekt på canvas

  useEffect(() => {
    // Om stageRef eller transformerRef inte finns, eller om inget objekt är valt, gör inget
    if (!stageRef.current || !transformerRef.current || selectedShapeIndex === null) return;
    
    // Hitta det valda objektet baserat på dess index
    const selectedNode = stageRef.current.findOne(`#shape-${selectedShapeIndex}`) as Konva.Node;
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShapeIndex, shapes, stageRef]);

  // Funktion för att hantera när ett objekt dras (flyttas)
  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, index: number) => {
    // skapar en kopia av shapes-arrayen och uppdaterar positionen för det dragna objektet
    const newShapes = [...shapes];
    newShapes[index] = {
      ...newShapes[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setShapes(newShapes);  // Uppdatera state med de nya positionerna
  };

  return (
    <div className="canvas">
      {/* Kontrollpanelen med verktyg och inställningar */}
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

      />

      <div className="canvas-wrapper" style={{ width: `${windowSize.width * 0.7}px`, height: `${windowSize.height * 0.8}px` }}>
        {/* Konva Stage-komponenten, (canvasytan) */}
        <Stage
          width={windowSize.width * 0.7}
          height={windowSize.height * 0.8}
          onMouseDown={handleMouseDown}  // Håller koll på musnedtryck
          onMouseMove={handleMouseMove}  // Håller koll på musrörelse
          onMouseUp={handleMouseUp}  // Håller koll på musuppsläpp
          ref={stageRef}  // Referens till Konva stage
        >
          <Layer>
            {/* Rendera alla former (shapes) som finns i state */}
            {shapes.map((shape, index) => {
              // Grundläggande egenskaper som ska tillämpas på varje form
              const shapeProps = {
                draggable: true,  // Gör varje form dragbar
                onClick: () => {
                  if (tool === 'delete') {
                    handleDelete(index);  // Ta bort formen om "delete" är valt
                  } else {
                    setSelectedShapeIndex(index);  // Markera formen om inget "delete" är valt
                  }
                },
                onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => handleDragEnd(e, index),  // Hantera slutet på dragning av formen
                id: `shape-${index}`,  // Sätt ett unikt ID för varje form
              };

              // Beroende på formens typ (line, circle, rect, svg) renderas olika Konva-komponenter
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
                  return null;  // Om ingen typ matchar, renderas inget
              }
            })}
            {/* Om ett objekt är valt, renderas Transformer för att låta användaren manipulera det */}
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

import { useState, useRef, useEffect, useCallback } from 'react';
import { Shape, loadImage } from './shapes';
import Konva from 'konva';
import useStageStore from '../../store/seStageStore';

export const useCanvas = () => {
  const [tool, setTool] = useState('draw'); // draw, circle, rectangle, svg, edit
  const [lineWidth, setLineWidth] = useState(3);  // Default line width
  const [color, setColor] = useState('#ff0000'); // Color state
  const [shapes, setShapes] = useState<Shape[]>([]); // All shapes on the canvas
  const [isDrawing, setIsDrawing] = useState(false); // If the user is currently drawing
  const [selectedSVG, setSelectedSVG] = useState('/src/assets/images/tree.svg'); // which SVG is selected
  const stageRef = useRef<Konva.Stage | null>(null); // stage referens to access the Konva stage
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth,height: window.innerHeight,});
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);  // Index of the selected shape

  const { stage, setStage } = useStageStore(); // Hämta stage och setStage från store
  // UppdateWindowSize funktionen
  const updateWindowSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // useEffect to add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, [updateWindowSize]);

// Function to handle when an object is dragged (moved)
  const handleExport = () => {
    if (!stageRef.current) return;

    // Create a data URL from the stage
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // pixelRatio for better quality

    // Create a link element and click on it to trigger the download
    const link = document.createElement("a");
    link.href = uri;
    link.download = "my-garden-design.png"; // Filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle when an object is dragged (moved)
    const handleMouseDown = async () => {
      if (!stageRef.current) return;
      const stage = stageRef.current.getStage();
      const pos = stage.getPointerPosition();
      if (!pos) return;
    
      // Check if a shape was clicked
      const clickedShape = stage.getIntersection(pos);
      if (clickedShape) {
        const node = clickedShape;
        const index = shapes.findIndex((shape) => shape.id === node.id());
    
        if (index !== -1) {
          setSelectedShapeIndex(index);
          return; // Cancel the rest of the function
        }
      }
    
      // If the edit tool is selected, do nothing
      if (tool === "edit") return;
    
    let newShape: Shape | null = null;

    // Create a new shape based on the selected tool
    switch (tool) {
      case 'draw':
        newShape = { id: Date.now().toString(), tool: 'line', points: [pos.x, pos.y], color, lineWidth, };
        setIsDrawing(true);
        break;
      case 'circle':
        newShape = { id: Date.now().toString(), tool: 'circle', x: pos.x, y: pos.y, color, radius: 30 };
        break;
      case 'rectangle':
        newShape = { id: Date.now().toString(), tool: 'rect', x: pos.x, y: pos.y, color, width: 80, height: 80 };
        break;
      case 'svg': {
        const img = await loadImage(selectedSVG);
        newShape = { id: Date.now().toString(), tool: 'svg', x: pos.x, y: pos.y, image: img };
        break;
      }
    }

    // Add the new shape to the shapes array
    if (newShape) setShapes((prevShapes) => [...prevShapes, newShape]);
    setStage(stageRef.current?.getStage() || null);
  };

  // Update the points of the last shape when the mouse moves
  const handleMouseMove = () => {
    if (!isDrawing || tool !== 'draw' || !stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

  // Update the points of the last shape
    setShapes((prevShapes) => {
      const lastShape = prevShapes[prevShapes.length - 1];
      if (lastShape?.points) {
        lastShape.points = [...lastShape.points, pos.x, pos.y];
      }
      return [...prevShapes];
    });
    setStage(stageRef.current?.getStage() || null); // Update Zustand store
  };

  // Function to handle when the mouse is released
  const handleMouseUp = () => {
    setIsDrawing(false);
    setStage(stageRef.current?.getStage() || null); // Update Zustand store
  };

  // Function to handle when an object is dragged (moved)
  const handleDelete = (index: number) => {
    setShapes((prevShapes) => prevShapes.filter((_, i) => i !== index));
    setStage(stageRef.current?.getStage() || null); // Update Zustand store
  };

  useEffect(() => {
    // If stageRef or transformerRef doesn't exist or no object is selected, do nothing
    const container = document.getElementById('canvas-wrapper');
    if (stageRef.current && !stage && container) {
      const newStage = new Konva.Stage({
        width: windowSize.width,
        height: windowSize.height,
        container: 'canvas-wrapper',
      });
      stageRef.current = newStage;
      setStage(newStage); // Set the stage in Zustand store
    }
  }, [windowSize, stage, setStage]);
  
  useEffect(() => {
    if (stageRef.current) {
      setStage(stageRef.current.getStage()); // Update Zustand store when stageRef changes
    }
  }, [shapes, setStage]); 

  // Function to save the canvas as JSON
  const saveCanvasAsJson = () => {
    if (!stage) return; // If stage doesn't exist, do nothing
    const json = stage.toJSON();
    console.log("Canvas JSON:", json);
  };

  return {
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
    handleExport,
    lineWidth,
    setLineWidth,
    saveCanvasAsJson,
  };
};

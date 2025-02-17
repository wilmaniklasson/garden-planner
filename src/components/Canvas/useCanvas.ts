import { useState, useRef, useEffect, useCallback } from 'react';
import { Shape } from './shapes';
import Konva from 'konva';
import { getAuth } from 'firebase/auth';
import { useZoom } from "../../hooks/useZoom";
import { exportCanvas } from "../../utils/exportCanvas";
import { useFirebaseCanvas } from "../../hooks/useFirebaseCanvas";
import { useCanvasEvents } from '../../hooks/useCanvasEvents';


export const useCanvas = () => {
  const [tool, setTool] = useState('draw'); // draw, circle, rectangle, svg, edit
  const [lineWidth, setLineWidth] = useState(3);  // Default line width
  const [color, setColor] = useState('#ff0000'); // Color state
  const [shapes, setShapes] = useState<Shape[]>([]); // All shapes on the canvas
  const [isDrawing, setIsDrawing] = useState(false); // If the user is currently drawing
  const [selectedSVG, setSelectedSVG] = useState(""); // which SVG is selected
  const stageRef = useRef<Konva.Stage | null>(null); // stage referens to access the Konva stage
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth,height: window.innerHeight,});
  
  // From hook useCanvasEvents
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    selectedShapeIndex,
    setSelectedShapeIndex
  } = useCanvasEvents(tool, shapes, setShapes, stageRef, isDrawing, setIsDrawing, selectedSVG);

  // From hook useFirebaseCanvas
  const { saveCanvasToFirebase, loadCanvasFromFirebase } = useFirebaseCanvas(setShapes);
  useZoom(stageRef);


  // Load the canvas from Firebase when the user logs in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadCanvasFromFirebase();
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  // Function to update the window size
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
    exportCanvas(stageRef);
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
    saveCanvasToFirebase,
    loadCanvasFromFirebase,
  };
};

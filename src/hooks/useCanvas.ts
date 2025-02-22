import { useState, useEffect, useCallback } from 'react';
import { Shape } from '../utils/shapes';
import { getAuth } from 'firebase/auth';
import { useZoom } from "./useZoom";
import { exportCanvas } from "../utils/exportCanvas";
import { useFirebaseCanvas } from "./useFirebaseCanvas";
import { useCanvasEvents } from './useCanvasEvents';
import { useCanvasStore } from '../store/CanvasStore';


export const useCanvas = () => {
  const [shapes, setShapes] = useState<Shape[]>([]); // All shapes on the canvas
  const { stageRef, setWindowSize} = useCanvasStore(); // Zustand
 
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
  } = useCanvasEvents(shapes, setShapes,);

  // From hook useFirebaseCanvas
  const { saveCanvasToFirebase, loadCanvasFromFirebase } = useFirebaseCanvas(setShapes);
  useZoom(stageRef);

  const { handleZoom } = useZoom(stageRef);

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
    shapes,
    setShapes,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    handleExport,
    saveCanvasToFirebase,
    loadCanvasFromFirebase,
    handleZoom,
  };
};

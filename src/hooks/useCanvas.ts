import { useState, useEffect } from 'react';
import { Shape } from '../utils/shapes';
import { getAuth } from 'firebase/auth';
import { exportCanvas } from "../utils/exportCanvas";
import { useFirebaseCanvas } from "./useFirebaseCanvas";
import { useCanvasEvents } from './useCanvasEvents';
import { useCanvasStore } from '../store/CanvasStore';


export const useCanvas = () => {
  const [shapes, setShapes] = useState<Shape[]>([]); // All shapes on the canvas
  const { stageRef} = useCanvasStore(); // Zustand
 
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
  } = useCanvasEvents(shapes, setShapes,);

  // From hook useFirebaseCanvas
  const { saveCanvasToFirebase, loadCanvasFromFirebase } = useFirebaseCanvas(setShapes);



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
  };
};

import { useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { exportCanvas } from "../utils/exportCanvas";
import { useFirebaseCanvas } from "./useFirebaseCanvas";
import { useCanvasEvents } from './useCanvasEvents';
import { useCanvasStore } from '../store/CanvasStore';
import Konva from 'konva';

export const useCanvas = () => {
  // Zustand store useCanvas
  const { 
    shapes, 
    stageRef, 
    selectedShapeIndex, 
    setShapes, 
    setCanvasSize,
    setSelectedShapeIndex, 
  } = useCanvasStore(); 

  // From hook useCanvasEvents
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    handleDragEnd,
    handleTransformEnd,
  } = useCanvasEvents(); 

  // From hook useFirebaseCanvas 
  const { saveCanvasToFirebase, loadCanvasFromFirebase } = useFirebaseCanvas(setShapes);

  // Ref for the transformer
  const transformerRef = useRef<Konva.Transformer | null>(null); 

  /* ============= useEffects ============= */

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

  // Update the canvas size when the window is resized
  useEffect(() => {
    const updateCanvasSize = () => {
      const newSize = { width: window.innerWidth, height: window.innerHeight };
      setCanvasSize(newSize);
    };
  
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [setCanvasSize]);

  /* ============= Functions for useEffects ============= */

  // Update the transformer when the selected shape changes
  const useUpdateTransformer = () => {
    useEffect(() => {
      if (!stageRef.current || !transformerRef.current || selectedShapeIndex === null) return;

      const selectedNode = stageRef.current.findOne(`#shape-${selectedShapeIndex}`) as Konva.Node;
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    }, [selectedShapeIndex, shapes, stageRef]);
  };
  
  // Log the new size of a shape after it has been resized
  const useLogShapeResize = () => {
    useEffect(() => {
      if (!transformerRef.current) return;

      transformerRef.current.on("transformend", () => {
        const nodes = transformerRef.current?.nodes();
        if (!nodes) return;

        nodes.forEach(node => {
          console.log(`Shape resized: ID=${node.id()}, New Width=${node.width()}, New Height=${node.height()}`);
        });
      });
    }, [transformerRef]);
  };

  /* ============= Functions ============= */
  
  // Export the canvas as an image
  const handleExport = () => {
    if (stageRef.current) {
      exportCanvas(stageRef);
    }
  };

  // Deselect the selected shape
  function handleDeselect() {
    setSelectedShapeIndex(null);
  }

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
    handleDeselect,
    handleTransformEnd,
    handleDragEnd,
    useUpdateTransformer,
    useLogShapeResize,
  };
};
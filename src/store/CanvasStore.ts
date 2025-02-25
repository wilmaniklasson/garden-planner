import { create } from 'zustand';
import Konva from 'konva';
import React from 'react';
import { Shape } from '../utils/shapes';
interface CanvasState {
  isDrawing: boolean;
  windowSize: { width: number; height: number };
  stageRef: React.RefObject<Konva.Stage>;
  selectedShapeIndex: number | null;
  canvasSize: { width: number; height: number }; 
  shapes: Shape[];
  setIsDrawing: (isDrawing: boolean) => void;
  setWindowSize: (windowSize: { width: number; height: number }) => void;
  setStageRef: (stageRef: React.RefObject<Konva.Stage>) => void;
  setSelectedShapeIndex: (index: number | null) => void;
  setCanvasSize: (canvasSize: { width: number; height: number }) => void;
  setShapes: (shapes: Shape[]) => void;
  addShape: (shape: Shape) => void;
  removeShape: (index: number) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  isDrawing: false,
  windowSize: { width: window.innerWidth, height: window.innerHeight },
  stageRef: React.createRef<Konva.Stage>(),
  selectedShapeIndex: null,
  canvasSize: { width: window.innerWidth, height: window.innerHeight },
  shapes: [],
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  setWindowSize: (windowSize) => set({ windowSize }),
  setStageRef: (stageRef) => set({ stageRef }),
  setSelectedShapeIndex: (index) => set({ selectedShapeIndex: index }),
  setCanvasSize: (canvasSize) => set({ canvasSize }),
  setShapes: (shapes) => set({ shapes }),
  addShape: (shape) => set((state) => ({ shapes: [...state.shapes, shape] })),
  removeShape: (index: number) => set((state) => ({ shapes: state.shapes.filter((_, i) => i !== index) })),
}));

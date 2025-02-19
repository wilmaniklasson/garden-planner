import { create } from 'zustand';
import { Shape } from '../utils/shapes';
import Konva from 'konva';
import React from 'react';

interface CanvasState {
  shapes: Shape[];
  isDrawing: boolean;
  windowSize: { width: number; height: number };
  stageRef: React.RefObject<Konva.Stage>;
  setShapes: (shapes: Shape[]) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setWindowSize: (windowSize: { width: number; height: number }) => void;
  setStageRef: (stageRef: React.RefObject<Konva.Stage> ) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  shapes: [],
  isDrawing: false,
  windowSize: { width: window.innerWidth, height: window.innerHeight },
  stageRef: React.createRef<Konva.Stage>(),
  setShapes: (shapes) => set({ shapes }),
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  setWindowSize: (windowSize) => set({ windowSize }),
  setStageRef: (stageRef) => set({ stageRef }),
}));

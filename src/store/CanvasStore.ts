import { create } from 'zustand';
import Konva from 'konva';
import React from 'react';

interface CanvasState {
  isDrawing: boolean;
  windowSize: { width: number; height: number };
  stageRef: React.RefObject<Konva.Stage>;
  selectedShapeIndex: number | null;
  setIsDrawing: (isDrawing: boolean) => void;
  setWindowSize: (windowSize: { width: number; height: number }) => void;
  setStageRef: (stageRef: React.RefObject<Konva.Stage>) => void;
  setSelectedShapeIndex: (index: number | null) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  isDrawing: false,
  windowSize: { width: window.innerWidth, height: window.innerHeight },
  stageRef: React.createRef<Konva.Stage>(),
  selectedShapeIndex: null,
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  setWindowSize: (windowSize) => set({ windowSize }),
  setStageRef: (stageRef) => set({ stageRef }),
  setSelectedShapeIndex: (index) => set({ selectedShapeIndex: index }),
}));

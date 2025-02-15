import { create } from "zustand";

interface CanvasState {
  scale: number;
  setScale: (scale: number) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  scale: 1, // Default zoomnivå
  setScale: (scale) => set({ scale }),
}));

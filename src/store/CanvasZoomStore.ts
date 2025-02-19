import { create } from "zustand";

// interface for Canvas zoom state
interface CanvasZoomState {
  scale: number;
  setScale: (scale: number) => void;
}

export const useCanvasZoomStore= create<CanvasZoomState>((set) => ({
  scale: 1, // Default scale
  setScale: (scale) => set({ scale }),
}));


import { create } from "zustand";

// interface for Canvas zoom state
interface CanvasZoomState {
  scale: number;
  x: number;
  y: number;
  setScale: (scale: number) => void;
  setPosition: (x: number, y: number) => void;
  zoom: (zoomIn: boolean) => void;
}

export const useCanvasZoomStore = create<CanvasZoomState>((set) => ({
  scale: 1,
  x: 0,
  y: 0,
  setScale: (scale) => {
    const minScale = 0.5; 
    const maxScale = 3;
    if (scale < minScale) scale = minScale;
    if (scale > maxScale) scale = maxScale;
    set({ scale });
  },
  setPosition: (x, y) => {
    set({ x, y });
  },
  zoom: (zoomIn: boolean) => {
    set((state) => {
      const scaleBy = 1.05;
      let newScale = zoomIn ? state.scale * scaleBy : state.scale / scaleBy;
      const minScale = 0.5;
      const maxScale = 3;
      newScale = Math.max(minScale, Math.min(maxScale, newScale));
      return { scale: newScale };
    });
  },
}));


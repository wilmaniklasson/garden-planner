import { create } from "zustand";

// interface for Canvas zoom state
interface CanvasState {
  scale: number;
  setScale: (scale: number) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  scale: 1, // Default scale
  setScale: (scale) => set({ scale }),
}));


// interface for Canvas Tools
interface CanvasToolsState {
  tool: string;
  setTool: (tool: string) => void;
  lineWidth: number;
  setLineWidth: (lineWidth: number) => void;
  color: string;
  setColor: (color: string) => void;
  SVG: string;
  setSVG: (SVG: string) => void;
}

// Create a store for Canvas Tools
export const useCanvasToolsStore = create<CanvasToolsState>((set) => ({
  tool: '', // Default tool
  setTool: (tool) => set({ tool }),
  lineWidth: 3, // Default line width
  setLineWidth: (lineWidth) => set({ lineWidth }),
  color: '#ff0000', // Default color
  setColor: (color) => set({ color }),
  SVG: '', // Default SVG
  setSVG: (SVG) => set({ SVG }),
}));

import { create } from "zustand";

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

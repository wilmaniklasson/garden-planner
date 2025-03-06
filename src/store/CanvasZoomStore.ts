import { create } from "zustand";
import { useCanvasStore } from "../store/CanvasStore";

// Interface for Canvas zoom state
interface CanvasZoomState {
  scale: number;
  x: number;
  y: number;
  setScale: (scale: number, centerX?: number, centerY?: number) => void;
  setPosition: (x: number, y: number) => void;
  zoom: (zoomIn: boolean, centerX: number, centerY: number) => void;
  handleWheelZoom: (e: React.WheelEvent) => void;  // Add handleWheelZoom function to state
}

export const useCanvasZoomStore = create<CanvasZoomState>((set, get) => ({
  scale: 1,
  x: 0,
  y: 0,
  setScale: (newScale, centerX = 0, centerY = 0) => {
    const { scale, x, y } = get();
    const minScale = 0.5;
    const maxScale = 3;

    // Limit the scale
    newScale = Math.max(minScale, Math.min(maxScale, newScale));

    // Fetch canvas size from CanvasStore
    const { canvasSize } = useCanvasStore.getState();
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    // Calculate the new position based on canvas size
    const scaleRatio = newScale / scale;
    const newX = centerX - (centerX - x) * scaleRatio;
    const newY = centerY - (centerY - y) * scaleRatio;

    // Limit the zoom position to avoid going out of bounds
    const maxOutOfBoundsX = (canvasWidth * (newScale - 1)) / 2;
    const maxOutOfBoundsY = (canvasHeight * (newScale - 1)) / 2;
    const boundedX = Math.max(-maxOutOfBoundsX, Math.min(maxOutOfBoundsX, newX));
    const boundedY = Math.max(-maxOutOfBoundsY, Math.min(maxOutOfBoundsY, newY));

    set({ scale: newScale, x: boundedX, y: boundedY });
  },
  setPosition: (x, y) => {
    set({ x, y });
  },
  zoom: (zoomIn, centerX, centerY) => {
    const scaleBy = 1.05;
    const { scale } = get();

    // Calculate new scale based on zoom direction
    const newScale = zoomIn ? scale * scaleBy : scale / scaleBy;

    // Call setScale to update scale and position
    get().setScale(newScale, centerX, centerY);
  },

  // Handle zoom with mouse wheel
  handleWheelZoom: (e: React.WheelEvent) => {
    // Prevent default scroll behavior
 

    // Check if the user is scrolling up or down
    const zoomIn = e.deltaY < 0; // If scrolling up, zoom in; if down, zoom out

    // Fetch canvas size from CanvasStore for zoom center position
    const { canvasSize } = useCanvasStore.getState();
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;

    // Adjust zoom based on the wheel direction
    get().zoom(zoomIn, centerX, centerY);
  },
}));

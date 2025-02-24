import Konva from "konva";


export enum ToolType {
  Line = 'line',
  Circle = 'circle',
  Rect = 'rect',
  SVG = 'svg',
  CircleGrass = 'circle-grass',
  RectGrass = 'rect-grass',
  GardenBed = 'garden-bed',
  Grid = 'grid',
  Edit = 'edit',
  MoveCanvas = 'move-canvas',
  Delete = 'delete',
}



export interface Shape {
  id: string;
  tool: ToolType;
  points?: number[];
  x?: number;
  y?: number;
  color?: string;
  radius?: number;
  stroke?: string;
  strokeWidth?: number;
  gradient?: {
    startColor: string;
    endColor: string;
  };
  width?: number;
  height?: number;
  image?: HTMLImageElement | string;
  node?: Konva.Node;
  lineWidth?: number;
}

// Function to load an image (handles both regular images and SVGs)
export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.src = src;

    if (src.endsWith('.svg')) {
      img.onload = () => {
        resolve(img);
      };
    } else {
      img.onload = () => resolve(img);
    }

    img.onerror = (err) => reject(new Error(`Error loading image: ${err}`)); 
  });
};

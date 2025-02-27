import Konva from "konva";


export enum ToolType {
  Line = 'line',
  Circle = 'circle',
  Rect = 'rect',
  SVG = 'svg',
  CircleGrass = 'circle-grass',
  CircleGardenBed = 'circle-garden-bed',
  RectGrass = 'rect-grass',
  GardenBed = 'garden-bed',
  Grid = 'grid',
  Edit = 'edit',
  MoveCanvas = 'move-canvas',
  Delete = 'delete',
  Transform = 'transform',
  Wedge = 'wedge',
  wedgeGrass = 'wedge-grass',
  wedgeGardenBed = 'wedge-garden-bed',
}



export interface Shape {
  id: string;
  tool: ToolType;
  points?: number[] | null;
  x?: number | null;
  y?: number | null;
  angle?: number;
  color?: string;
  radius?: number;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  image?: HTMLImageElement | string;
  node?: Konva.Node;
  lineWidth?: number;
  rotation?: number;
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

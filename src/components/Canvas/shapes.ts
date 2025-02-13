import Konva from "konva";

export interface Shape {
  id: string;
  tool: 'line' | 'circle' | 'rect' | 'svg';
  points?: number[];
  x?: number;
  y?: number;
  color?: string;
  radius?: number;
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

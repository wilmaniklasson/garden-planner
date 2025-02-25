import { Shape, ToolType, loadImage } from '../utils/shapes';

export const createShape = async (
  tool: ToolType,
  pos: { x: number; y: number },
  color: string,
  lineWidth: number,
  SVG: string
): Promise<Shape> => {
  let newShape: Shape | null = null;

  switch (tool) {
    case 'line':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.Line,
        points: [pos.x, pos.y],
        color: color,
        lineWidth: lineWidth,
      };
      break;
    case 'circle':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.Circle,
        x: pos.x,
        y: pos.y,
        color: color,
        radius: 30,
      };
      break;
    case 'rect':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.Rect,
        x: pos.x,
        y: pos.y,
        color: color,
        width: 80,
        height: 80,
        radius: 0,
      };
      break;
    case 'svg': {
      const img = await loadImage(SVG);
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.SVG,
        x: pos.x,
        y: pos.y,
        image: img,
        radius: 0,
        width: 80,
        height: 80,
      };
      break;
    }
    case 'circle-grass':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.CircleGrass,
        x: pos.x,
        y: pos.y,
        radius: 80,
        color: 'rgba(76, 175, 80, 0.6)',
        width: 700,
        height: 500,
      };
      break;
    case 'rect-grass':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.RectGrass,
        x: pos.x,
        y: pos.y,
        radius: 0,
        color: 'rgba(76, 175, 80, 0.6)',
        width: 700,
        height: 500,
      };
      break;
    case 'garden-bed':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.GardenBed,
        x: pos.x,
        y: pos.y,
        color: 'rgba(139, 69, 19, 0.6)',
        width: 130,
        height: 90,
        radius: 0,
      };
      break;
    case 'grid':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.Grid,
        x: pos.x,
        y: pos.y,
        color: 'rgba(0, 0, 0, 0.6)',
        width: 700,
        height: 500,
        radius: 0,
      };
      break;
    default:
      break;
  }

  // if (newShape)  is null, return a default shape
  return newShape || {
    id: Date.now().toString(),
    tool: ToolType.Line,
    points: [0, 0],
    color: 'black',
    lineWidth: 1,
  };
};

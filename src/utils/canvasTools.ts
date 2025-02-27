import { Shape, ToolType, loadImage } from '../utils/shapes';

export const createShape = async (
  tool: ToolType,
  pos: { x: number | null; y: number | null; },
  color: string,
  lineWidth: number,
  SVG: string,
  
): Promise<Shape | null> => {
  let newShape: Shape | null = null;

  switch (tool) {
    case 'line':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.Line,
        points: [pos.x ?? 0, pos.y ?? 0],
        color: color,
        lineWidth: lineWidth,
        x: null,
        y: null
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
        width: 100,
        height: 100,
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
      case 'circle-garden-bed':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.CircleGrass,
        x: pos.x,
        y: pos.y,
        radius: 80,
        color: 'rgba(139, 69, 19, 0.6)',
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
    default:
      break;
  }
  
  return newShape || null;
  };

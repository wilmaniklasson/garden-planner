import { Shape, ToolType, loadImage } from '../utils/shapes';

export const createShape = async (
  tool: ToolType,
  pos: { x: number; y: number },
  color: string,
  lineWidth: number,
  SVG: string
) => {
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
        gradient: {
          startColor: 'rgba(76, 175, 80, 0.6)',
          endColor: 'rgba(56, 142, 60, 0.6)',
        },
      };
      break;
    case 'rect-grass':
      newShape = {
        id: Date.now().toString(),
        tool: ToolType.RectGrass,
        x: pos.x,
        y: pos.y,
        color: 'rgba(76, 175, 80, 0.6)',
        width: 130,
        height: 90,
      };
      break;
  }

  return newShape;
};

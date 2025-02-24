import { Layer, Line } from "react-konva";
import './Canvas.css';

interface GridProps {
  gridSize?: number;
  stageWidth: number;
  stageHeight: number;
}

const Grid = ({ gridSize = 50, stageWidth, stageHeight }: GridProps) => {
  const lines = [];

  for (let x = 0; x < stageWidth; x += gridSize) {
    lines.push(
      <Line key={`v-${x}`} points={[x, 0, x, stageHeight]} stroke="#BCBAB8" strokeWidth={2} />
    );
  }

  for (let y = 0; y < stageHeight; y += gridSize) {
    lines.push(
      <Line key={`h-${y}`} points={[0, y, stageWidth, y]} stroke="#BCBAB8" strokeWidth={2} />
    );
  }

  return <Layer>{lines}</Layer>;
};

export default Grid;

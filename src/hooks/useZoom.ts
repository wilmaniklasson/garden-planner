import { useEffect } from "react";
import Konva from "konva";
import { useCanvasStore } from "../store/store";

export const useZoom = (stageRef: React.RefObject<Konva.Stage>) => {
  useEffect(() => {
    const stage = stageRef.current?.getStage();
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const stage = stageRef.current?.getStage();
      if (!stage) return;

      const scaleBy = 1.05;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const { scale, setScale } = useCanvasStore.getState();
      const newScale = e.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
      const minScale = 0.5;
      const maxScale = 3;
      if (newScale < minScale || newScale > maxScale) return;

      setScale(newScale);

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      stage.position(newPos);
      stage.batchDraw();
    };

    stage.container().addEventListener("wheel", handleWheel);
    return () => {
      stage.container().removeEventListener("wheel", handleWheel);
    };
  }, []);
};

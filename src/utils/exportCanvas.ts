import Konva from "konva";

export const exportCanvas = (stageRef: React.RefObject<Konva.Stage>) => {
  if (!stageRef.current) return;
  const uri = stageRef.current.toDataURL({ pixelRatio: 2 });

  const link = document.createElement("a");
  link.href = uri;
  link.download = "my-garden-design.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

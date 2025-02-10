import { useState, useRef, useEffect, useCallback } from 'react';
import { Shape, loadImage } from './shapes';
import Konva from 'konva';

export const useCanvas = () => {
  const [tool, setTool] = useState('draw'); // draw, circle, rectangle, svg, edit
  const [color, setColor] = useState('#ff0000'); // Färg på figuren
  const [shapes, setShapes] = useState<Shape[]>([]); // Alla figurer sparade i state
  const [isDrawing, setIsDrawing] = useState(false); // Håller reda på om användaren ritar
  const [selectedSVG, setSelectedSVG] = useState('/src/assets/images/tree.svg'); // Vilken SVG som är vald
  const stageRef = useRef<Konva.Stage | null>(null); // stage referens för att komma åt Konva
  const [windowSize, setWindowSize] = useState({ // canvas storlek
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);  // Index för vald figur


  // Uppdaterar fönsterstorleken när användaren ändrar storlek
  const updateWindowSize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // useEffect för att lyssna på fönsterstorleken
  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, [updateWindowSize]);

// Funktion för att exportera canvasen som en bild
  const handleExport = () => {
    if (!stageRef.current) return;

    // Skapar en bild-URL från hela canvasen
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 }); // pixelRatio ökar upplösningen

    // Skapar en nedladdningslänk
    const link = document.createElement("a");
    link.href = uri;
    link.download = "my-garden-design.png"; // Filnamn
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Funktion för att hanteraklick på canvasen
    const handleMouseDown = async () => {
      if (!stageRef.current) return;
      const stage = stageRef.current.getStage();
      const pos = stage.getPointerPosition();
      if (!pos) return;
    
      // Kolla om användaren klickar på ett befintligt objekt
      const clickedShape = stage.getIntersection(pos);
      if (clickedShape) {
        const node = clickedShape;
        const index = shapes.findIndex((shape) => shape.id === node.id());
    
        if (index !== -1) {
          setSelectedShapeIndex(index);
          return; // Avbryt så att ett nytt objekt inte skapas ovanpå det valda
        }
      }
    
      // Om "edit" är valt, ska vi INTE lägga till nya objekt
      if (tool === "edit") return;
    
    let newShape: Shape | null = null;

    // Skapar en ny figur beroende på vilket verktyg som är valt
    switch (tool) {
      case 'draw':
        newShape = { id: Date.now().toString(), tool: 'line', points: [pos.x, pos.y], color };
        setIsDrawing(true);
        break;
      case 'circle':
        newShape = { id: Date.now().toString(), tool: 'circle', x: pos.x, y: pos.y, color, radius: 30 };
        break;
      case 'rectangle':
        newShape = { id: Date.now().toString(), tool: 'rect', x: pos.x, y: pos.y, color, width: 80, height: 80 };
        break;
      case 'svg': {
        const img = await loadImage(selectedSVG);
        newShape = { id: Date.now().toString(), tool: 'svg', x: pos.x, y: pos.y, image: img };
        break;
      }
    }

    // Lägger till den nya figuren i state
    if (newShape) setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  // Uppdaterar den sista figuren när musen flyttas
  const handleMouseMove = () => {
    if (!isDrawing || tool !== 'draw' || !stageRef.current) return;
    const stage = stageRef.current.getStage();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setShapes((prevShapes) => {
      const lastShape = prevShapes[prevShapes.length - 1];
      if (lastShape?.points) {
        lastShape.points = [...lastShape.points, pos.x, pos.y];
      }
      return [...prevShapes];
    });
  };

  const handleMouseUp = () => setIsDrawing(false);

  const handleDelete = (index: number) => {
    setShapes((prevShapes) => prevShapes.filter((_, i) => i !== index));
  };

  return {
    tool,
    setTool,
    color,
    setColor,
    shapes,
    setShapes,
    selectedSVG,
    setSelectedSVG,
    windowSize,
    stageRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    selectedShapeIndex,
    setSelectedShapeIndex,
    handleExport,
  };
};

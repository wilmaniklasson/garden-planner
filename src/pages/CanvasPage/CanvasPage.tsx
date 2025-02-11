
import Canvas from "../../components/Canvas/Canvas";
import SidePanel from "../../components/SidePanel/SidePanel";
import "./CanvasPage.css";

const CanvasPage = () => {
    return (
     <div className="CanvasPage">
        <SidePanel />
        <Canvas />
      </div>
    );
  };
  
  export default CanvasPage;
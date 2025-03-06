import Canvas from "../../components/Canvas/Canvas";
import Controls from '../../components/LeftPanel/Controls';
import CanvasActions from "../../components/RightPanel/CanvasActions";
import "./CanvasPage.css";

const CanvasPage = () => {
    return (
     <div className="CanvasPage">
       <Controls/>
        <Canvas />
        <CanvasActions/>
      </div>
    );
  };
  
  export default CanvasPage;
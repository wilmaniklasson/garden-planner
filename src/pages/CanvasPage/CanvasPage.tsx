import Canvas from "../../components/Canvas/Canvas";
import Controls from '../../components/LeftPanel/Controls';
import "./CanvasPage.css";

const CanvasPage = () => {
    return (
     <div className="CanvasPage">
       <Controls/>
        <Canvas />
      </div>
    );
  };
  
  export default CanvasPage;
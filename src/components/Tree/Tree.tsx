
import "./Tree.css";

const Tree = () => {
  return (
    <div className="tree-container">
      {[...Array(20)].map((_, i) => (
        <div key={i} className={`tree-leaf leaf-${i + 1}`}></div>
      ))}
    </div>
    
  );
};

export default Tree;
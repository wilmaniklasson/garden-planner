import React, { useEffect, useState } from 'react';
import './SidePanel.css';
import icon from '../../assets/garden-planner-icon.svg';
import './options.css';
import { useCanvasToolsStore } from '../../store/CanvasToolsStore';
import GroundMaterials from './GroundMaterials';
import TreesAndBushes from './TreesAndBushes';
import Plants from './Plants';
import Decoration from './Decoration';
import DesignTools from './DesignTools';
import Grid from './Grid';





const Controls: React.FC = () => {
  const { setTool, color, setColor, lineWidth, setLineWidth, setSVG} = useCanvasToolsStore(); 
  const [collapsed, setCollapsed] = useState(false); 

  const togglePanel = () => {
    setCollapsed(!collapsed);
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('');



  const handleSelectTool = (tool: string) => {
    if (selectedTool === tool) {
      setTool('');
      setSelectedTool('');
    } else {
      setTool(tool);
      setSelectedTool(tool);
    }
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  
  

  const toggleCategory = (category: string) => {
    setSelectedCategory(prev => (prev === category ? null : category));
  };

  return (
    <>
    <aside className={`side-panel ${collapsed ? 'collapsed' : ''}`}>
      <div className="menu-icon" onClick={togglePanel}>
        <span>{collapsed ? '☰' : '✖'}</span>
      </div>
   
      <div className='side-panel-header'>
        <h1>Garden Planner</h1>
        <img className='Garden-Planner-Icon' src={icon} alt="Garden Planner Icon" />
      </div>
      <div className='side-panel-content'>
        <Grid   selectedTool={selectedTool} 
          isOpen={selectedCategory === "grid"} 
          toggle={() => toggleCategory("grid")} 
          handleSelectTool={(tool, svg) => {
            setTool(tool);
            if (svg) {
              setSVG(svg);
            }
          }}
        />
        <GroundMaterials 
          selectedTool={selectedTool} 
          handleSelectTool={handleSelectTool}
          isOpen={selectedCategory === "groundMaterials"} 
          toggle={() => toggleCategory("groundMaterials")} 
        />
        
        <TreesAndBushes 
        setSelectedTool={setSelectedTool}
          selectedTool={selectedTool} 
          isOpen={selectedCategory === "treesAndBushes"} 
          toggle={() => toggleCategory("treesAndBushes")} 
          handleSelectTool={(tool, svg) => {
            setTool(tool);
            if (svg) {
              setSVG(svg);
            }
          }}
        />

        <Plants 
          selectedTool={selectedTool} 
          isOpen={selectedCategory === "plants"} 
          toggle={() => toggleCategory("plants")} 
          handleSelectTool={(tool, svg) => {
            setTool(tool);
            if (svg) {
              setSVG(svg);
            }
          }}
        />

        <Decoration 
          selectedTool={selectedTool} 
          isOpen={selectedCategory === "decoration"} 
          toggle={() => toggleCategory("decoration")} 
          handleSelectTool={(tool, svg) => {
            setTool(tool);
            if (svg) {
              setSVG(svg);
            }
          }}
        />
        
        <DesignTools
            selectedTool={selectedTool}
            handleSelectTool={handleSelectTool}
            isOpen={selectedCategory === 'designTools'}
            toggle={() => toggleCategory('designTools')}
            color={color}
            setColor={setColor}
            lineWidth={lineWidth}
            setLineWidth={setLineWidth}
          />
      </div>
    </aside>
    </>


    
  );
};

export default Controls;

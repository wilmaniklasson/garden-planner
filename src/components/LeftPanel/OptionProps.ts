interface OptionProps {
    selectedTool: string;
    handleSelectTool: (tool: string, svg?: string) => void;
    isOpen: boolean;
    toggle: () => void;
    selectedSVG?: string;
    setSelectedTool?: (tool: string) => void;
         
  }

    export default OptionProps;


    
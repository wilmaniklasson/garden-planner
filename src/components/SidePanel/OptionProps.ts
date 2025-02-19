interface OptionProps {
    selectedTool: string;
    handleSelectTool: (tool: string, svg: string) => void;
    isOpen: boolean;
    toggle: () => void;
    selectedSVG?: string;
  }

    export default OptionProps;


    
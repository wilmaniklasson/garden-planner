import Konva from 'konva';
import { create } from 'zustand';

interface StageState {
  stage: Konva.Stage | null;
  setStage: (newStage: Konva.Stage | null) => void;
}

const useStageStore = create<StageState>((set) => ({
  stage: null,
  setStage: (newStage) => set({ stage: newStage }),
}));

export default useStageStore;

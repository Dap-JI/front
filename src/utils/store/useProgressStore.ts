import { create } from 'zustand';

interface ProgressType {
  progress: number;
  setProgress: (data: number) => void;
}

const useProgressStore = create<ProgressType>((set) => ({
  progress: 0,
  setProgress: (data) => set({ progress: data }),
}));

export default useProgressStore;

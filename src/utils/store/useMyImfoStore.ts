import { create } from 'zustand';

type MyInfoState = {
  myId: any;
  setmyId: (myId: string) => void;
};

export const useMyInfoStore = create<MyInfoState>((set) => ({
  myId: null,
  setmyId: (myId) => set({ myId }),
}));

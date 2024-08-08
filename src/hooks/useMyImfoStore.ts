import { create } from 'zustand';

type MyInfoState = {
  userId: string | null;
  setUserId: (userId: string) => void;
};

export const useMyInfoStore = create<MyInfoState>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

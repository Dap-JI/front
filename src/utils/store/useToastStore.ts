import { create } from 'zustand';

interface ToastState {
  type: string;
  text: string;
  visible: boolean;
  showToast: (text: string, type: 'check' | 'warn') => void;
}

export const useToastStore = create<ToastState>((set) => ({
  type: '',
  text: '',
  visible: false,
  showToast: (text, type) => {
    set({ text, type, visible: true });
    setTimeout(() => set({ visible: false }), 3000);
  },
}));

//여긴 toast의 상태변화를관리 \

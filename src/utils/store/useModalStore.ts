import { create } from 'zustand';

type ModalState = {
  type: string;
  content: string;
  modalOpen: boolean;
  confirmAction: any;
  showModal: (
    type: 'alert' | 'choice',
    content: string,
    confirmAction?: () => void,
  ) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  type: '',
  content: '',
  modalOpen: false,
  confirmAction: null,
  showModal: (type, content, confirmAction) => {
    set({ type, content, modalOpen: true, confirmAction });
  },
  closeModal: () => {
    set({ modalOpen: false, confirmAction: null });
  },
}));

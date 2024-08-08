import { useModalStore } from '@/src/utils/store/useModalStore';

export const useModal = () => {
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const showModalHandler = (
    type: 'alert' | 'choice',
    content: string,
    confirmAction?: () => void,
  ) => {
    showModal(type, content, confirmAction);
  };

  return { showModalHandler, closeModal };
};

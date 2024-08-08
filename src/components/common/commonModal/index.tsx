import React from 'react';
import Modal from 'react-modal';

type ModalProps = {
  children?: React.ReactNode;
  isopen: boolean;
  onRequestClose: () => void;
  style: ReactModal.Styles;
};

const CommnModal = ({
  children,
  isopen,
  onRequestClose,
  style,
}: ModalProps) => {
  return (
    <Modal
      isOpen={isopen}
      style={style}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default CommnModal;

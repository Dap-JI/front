import CommonButton from '../commonButton';
import CommnModal from '../commonModal';
import styles from './modalChoice.module.scss';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useModalStore } from '@/src/utils/store/useModalStore';

const cn = classNames.bind(styles);

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100vh',
    zIndex: '101',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '80%',
    maxWidth: '400px',
    height: '200px',
    zIndex: '100',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: 'none',
    overflow: 'auto',
    padding: '0',
    borderRadius: '20px',
  },
};

const ModalChoice = () => {
  const { type, content, modalOpen, closeModal, confirmAction } =
    useModalStore();

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    closeModal();
  };

  return (
    <CommnModal
      isopen={modalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
    >
      <div className={cn('container')}>
        <div className={cn('contentWrapper')}>
          <Image
            src={process.env.NEXT_PUBLIC_URL + '/icon/icon.png'}
            alt="logo"
            width="70"
            height="70"
          />
          <p>{content}</p>
        </div>

        <div className={cn('btnWrapper')}>
          {type === 'choice' ? (
            <>
              <CommonButton
                name="취소"
                freeStyle="cancelBtn"
                onClick={closeModal}
              />
              <CommonButton
                name="확인"
                freeStyle="acceptBtn"
                onClick={handleConfirm}
              />
            </>
          ) : (
            <CommonButton
              name="확인"
              freeStyle="alertBtn"
              onClick={handleConfirm}
            />
          )}
        </div>
      </div>
    </CommnModal>
  );
};

export default ModalChoice;

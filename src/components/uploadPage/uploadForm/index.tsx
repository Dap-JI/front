import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import UploadInput from '@/src/components/common/uploadInput';

const cn = classNames.bind(styles);

const UploadForm = () => {
  return (
    <div>
      <UploadInput />
    </div>
  );
};

export default UploadForm;

import classNames from 'classnames/bind';
import styles from './imageInput.module.scss';

const cn = classNames.bind(styles);

const ImageInput = () => {
  return (
    <div>
      <label htmlFor="imageUpload">업로드</label>
      <input
        type="file"
        id="imageUpload"
        className={cn('filetextInput')}
        multiple
        accept="video/*"
      />
    </div>
  );
};

export default ImageInput;

import styles from './editForm.module.scss';
import classNames from 'classnames/bind';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import ImageInput from '@/src/components/common/imageInput';

const cn = classNames.bind(styles);

const EditForm = () => {
  return (
    <form className={cn('container')}>
      <ImageInput />
      <CommonInput type="text" />
      <CommonButton name="수정하기" />
    </form>
  );
};

export default EditForm;

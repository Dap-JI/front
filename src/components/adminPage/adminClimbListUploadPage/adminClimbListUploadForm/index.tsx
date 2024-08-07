'use client';
import { useState, useEffect } from 'react';
import styles from './adminClimbListUploadForm.module.scss';
import classNames from 'classnames/bind';
import ImageInput from '@/src/components/common/imageInput';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import { useForm } from 'react-hook-form';
import {
  useClimbListDatasUpload,
} from '@/src/app/climbList/api';
import { useFormListUploadProps } from '@/src/utils/type';

const cn = classNames.bind(styles);

const AdminClimbListUploadForm = () => {
  const [fileUrl, setFileUrl] = useState<string | ArrayBuffer | null>('');
  const { mutate: climbListDatasUpload } = useClimbListDatasUpload();
  //리스트 업로드

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      notice: '',
      logo: '',
    },
  });

  const onSubmit = (data: useFormListUploadProps) => {
    const formData = {
      ...data,
      logo: fileUrl,
    };

    climbListDatasUpload(formData);
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <ImageInput
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        foldername="gym-logo"
      />
      <CommonInput
        label="클라이밍짐 이름"
        register={register('name', {
          required: '클라이밍짐 이름을 입력해 주세요',
        })}
      />
      {errors.name && <span>{errors.name.message}</span>}
      <CommonInput
        label="주소"
        register={register('address', {
          required: '주소를 입력해 주세요',
        })}
      />
      {errors.address && <span>{errors.address.message}</span>}
      <CommonInput label="공지" register={register('notice')} />
      <CommonButton name="업로드" type="submit" />
    </form>
  );
};

export default AdminClimbListUploadForm;

//notice에 null값 추가해야할듯

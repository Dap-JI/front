'use client';
import { useState, useEffect } from 'react';
import styles from './adminClimbListEditForm.module.scss';
import classNames from 'classnames/bind';
import ImageInput from '@/src/components/common/imageInput';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import { useForm } from 'react-hook-form';
import { useClimbListDataUpdate } from '@/src/app/climbList/api';
import { useFormListUploadProps } from '@/src/utils/type';

const cn = classNames.bind(styles);

type AdminClimbListEditFormProps = {
  climbListDetail: useFormListUploadProps;
  params: {
    gymId: string;
  };
};

const AdminClimbListEditForm = ({
  params,
  climbListDetail,
}: AdminClimbListEditFormProps) => {
  const { gymId } = params;
  //gymId값
  const { logo, name, address, notice } = climbListDetail;
  //리스트 데이터
  const { mutate: climbListDatasUpdate } = useClimbListDataUpdate(gymId);
  //리스트 업데이트 함수
  const [fileUrl, setFileUrl] = useState<string>(logo);
  //이미지 파일 url

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      logo: '',
      address: '',
      notice: '',
    },
  });

  const onSubmit = (data: useFormListUploadProps) => {
    const formData = {
      ...data,
      logo: fileUrl,
    };
    climbListDatasUpdate(formData);
  };

  useEffect(() => {
    if (climbListDetail) {
      setValue('name', name);
      setValue('address', address);
      setValue('notice', notice);
      setFileUrl(logo);
    }
  }, [climbListDetail, setValue]);

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <ImageInput
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        foldername="gym-logo"
      />
      <CommonInput
        register={register('name', {
          required: '클라이밍짐 이름을 입력해 주세요',
        })}
      />
      {errors.name && <span>{errors.name.message}</span>}
      <CommonInput
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

export default AdminClimbListEditForm;

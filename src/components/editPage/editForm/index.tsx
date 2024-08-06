'use client';
import styles from './editForm.module.scss';
import classNames from 'classnames/bind';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import ImageInput from '@/src/components/common/imageInput';
import { useState, useEffect } from 'react';
import { useProfileDatas, useProfileUpdate } from '@/src/app/profile/api';
import { useForm } from 'react-hook-form';
import { useFormProfileEditProps } from '@/src/utils/type';
import { nickname_reg } from '@/src/utils/regex';

const cn = classNames.bind(styles);

const EditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      introduce: '',
    },
  });
  const [fileUrl, setFileUrl] = useState<string | ArrayBuffer | null>(null);
  const { data: profileData } = useProfileDatas();
  const { mutate: profileUpdate } = useProfileUpdate();
  const text = watch('introduce', '');
  const maxLength = 100;

  useEffect(() => {
    if (profileData?.user) {
      setFileUrl(profileData.user.img);
      setValue('nickname', profileData.user.nickname);
      setValue('introduce', profileData.user.introduce ?? '');
    }
  }, [profileData, setValue]);

  const onSubmit = (data: useFormProfileEditProps) => {
    const formData = {
      ...data,
      img: fileUrl,
    };
    profileUpdate(formData);
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <ImageInput
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
        foldername="profile-picture"
      />
      <div>
        <CommonInput
          type="text"
          register={register('nickname', {
            required: '닉네임을 입력해주세요',
            maxLength: {
              value: 10,
              message: '최대 10자까지 가능합니다.',
            },
            minLength: {
              value: 2,
              message: '최소 2글자 이상 입력해주세요.',
            },
            pattern: {
              value: nickname_reg,
              message: '한글, 소문자, 숫자만 가능합니다',
            },
          })}
          placeholder={profileData?.user.nickname}
        />
      </div>
      {errors.nickname && <span>{errors.nickname.message}</span>}
      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('limitedTextarea')}
          {...register('introduce', {
            maxLength: {
              value: 100,
              message: '최대 100자까지 가능합니다. ',
            },
          })}
        />
        <div className={cn('charCount')}>
          {text.length}/{maxLength}
        </div>
      </div>
      <CommonButton name="수정하기" type="submit" />
    </form>
  );
};

export default EditForm;

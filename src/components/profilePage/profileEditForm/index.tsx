'use client';
import styles from './ProfileEditForm.module.scss';
import classNames from 'classnames/bind';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import ImageInput from '@/src/components/common/imageInput';
import { useState, useEffect } from 'react';
import { useProfileDatas, useProfileUpdate } from '@/src/app/profile/api';
import { useForm } from 'react-hook-form';
import { useFormProfileEditProps } from '@/src/utils/type';
import { nickname_reg } from '@/src/utils/regex';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '../../common/moadlChoice';
import { useNicknameCheck } from '@/src/app/join/api';

const cn = classNames.bind(styles);

type EditFormProps = {
  params: {
    userId: string;
  };
};

const ProfileEditForm = ({ params }: EditFormProps) => {
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
  const { userId } = params;
  const [fileUrl, setFileUrl] = useState<string | ArrayBuffer | null>(null);
  const { data: profileData } = useProfileDatas(userId);
  const { mutate: profileUpdate } = useProfileUpdate(userId);
  const text = watch('introduce', '');
  const nickname = watch('nickname', '');
  const maxLength = 100;
  const { showModalHandler } = useModal();
  const { refetch } = useNicknameCheck(nickname, false);

  useEffect(() => {
    if (profileData?.user) {
      setFileUrl(profileData.user.img);
      setValue('nickname', profileData.user.nickname);
      setValue('introduce', profileData.user.introduce ?? '');
    }
  }, [profileData, setValue]);

  const onSubmit = async (data: useFormProfileEditProps) => {
    // 1. 닉네임이 변경되지 않은 경우: 닉네임 체크를 건너뛰고 수정 진행

    const formData = {
      ...data,
      img: fileUrl,
    };

    if (nickname === profileData?.user.nickname) {
      const confirmAction = () => {
        profileUpdate(formData);
      };
      showModalHandler('choice', '프로필을 수정하시겠어요?', confirmAction);
      return;
    }

    try {
      // 2. 닉네임이 변경되었을 경우: 중복 체크 후 처리

      const { data: checkResult } = await refetch();
      if (!checkResult?.data.available) {
        showModalHandler('alert', '닉네임이 중복되었습니다.');
        return;
      }

      // 3. 닉네임이 중복되지 않은 경우: 수정 진행

      const confirmAction = () => {
        profileUpdate(formData);
      };

      showModalHandler('choice', '프로필을 수정하시겠어요?', confirmAction);
    } catch (error) {
      showModalHandler('alert', '닉네임 확인 중 문제가 발생했습니다.');
    }
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
              message: '한글, 소문자, 숫자, _, - 만 가능합니다',
            },
          })}
          placeholder={profileData?.user?.nickname}
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
      <ModalChoice />
    </form>
  );
};

export default ProfileEditForm;

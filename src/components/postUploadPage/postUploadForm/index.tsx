import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import VideoInput from '@/src/components/common/videoInput';
import React, { useState } from 'react';
import HoldColorList from '../../climbListDetailPage/holdColorList';
import CommonInput from '../../common/commonInput';
import { useForm } from 'react-hook-form';
import { useFormPostUploadProps } from '@/src/utils/type';
import { useDetailUploadDatas } from '@/src/app/climbList/api';
import CommonButton from '../../common/commonButton';

const cn = classNames.bind(styles);

type PostUploadFormProps = {
  gymId: string | number;
};

type MediaUrlType = {
  videoUrl: string | null;
  thumbnailUrl: string | null;
};

const PostUploadForm = ({ gymId }: PostUploadFormProps) => {
  const [mediaUrl, setMediaUrl] = useState<MediaUrlType>({
    videoUrl: null,
    thumbnailUrl: null,
  });
  const [activeColor, setActiveColor] = useState<string | null>(null);
  //난이도 색
  const maxLength = 100;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<useFormPostUploadProps>();

  const text = watch('content', '');

  const { mutate: detailUploadDatas } = useDetailUploadDatas(gymId);

  const onSubmit = (data: useFormPostUploadProps) => {
    const formData = {
      ...data,
      media: mediaUrl.videoUrl,
      thumbnailUrl: mediaUrl.thumbnailUrl,
      color: activeColor,
      gym_idx: Number(gymId),
    };

    detailUploadDatas(formData);
    console.log(formData);
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <VideoInput mediaUrl={mediaUrl} setMediaUrl={setMediaUrl} />
      <CommonInput
        id="clearday"
        type="date"
        register={register('clearday', {
          required: '날짜를 선택해주세요',
          validate: (value) =>
            value <= getTodayDate() ||
            '날짜는 오늘 또는 이전 날짜로만 설정할 수 있어요!.',
        })}
      />
      <div className={styles.error_text_wrapper}>
        {errors.clearday && (
          <small className={styles.error_text}>{errors.clearday.message}</small>
        )}
      </div>
      <HoldColorList
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('limitedTextarea')}
          maxLength={maxLength}
          {...register('content', {
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
      <CommonButton name="답지 올리기" />
    </form>
  );
};

export default PostUploadForm;

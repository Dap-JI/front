import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import UploadInput from '@/src/components/common/uploadInput';
import React, { useState } from 'react';
import HoldColorList from '../../climbListDetailPage/holdColorList';
import CommonInput from '../../common/commonInput';
import { useForm } from 'react-hook-form';
// import { date_reg } from '@/src/utils/regex';
import { useFormProps } from '@/src/utils/type';
import { useDetailUploadDatas } from '@/src/app/climbList/api';

const cn = classNames.bind(styles);

const UploadForm = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  //비디오 파일 url
  const [activeColor, setActiveColor] = useState<string | null>(null);
  //난이도 색
  const maxLength = 100;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<useFormProps>();

  const text = watch('content', '');

  const { mutate: detailUploadDatas } = useDetailUploadDatas();

  const onSubmit = (data: useFormProps) => {
    const formData = {
      ...data,
      media: videoUrl,
      color: activeColor,
      // gym_idx: gymId,
    };
    detailUploadDatas(formData);
    console.log(formData);
  };

  //data에는 react-hook-form으로만 만든게 들어감(date,text)
  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <UploadInput videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
      <CommonInput
        id="clearday"
        type="date"
        register={register('clearday', {
          required: '날짜를 선택해주세요',
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
      <button className={cn('uploadBtn')}>답지 올리기</button>
    </form>
  );
};

export default UploadForm;

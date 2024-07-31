// 'sue client';
import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import UploadInput from '@/src/components/common/uploadInput';
import React, { useState } from 'react';
import HoldColorList from '../../climbListDetailPage/holdColorList';
import CommonInput from '../../common/commonInput';
import { useForm } from 'react-hook-form';
import { date_reg } from '@/src/utils/regex';
import { useFormProps } from '@/src/utils/type';

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

  const text = watch('text', '');

  const onSubmit = (data: any) => {
    console.log(data);
  };
  
  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <UploadInput videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
      {/* <UploadInput register={register('video')} setValue={setValue} /> */}
      <CommonInput
        id="date"
        placeholder="완등 날짜를 입력해주세요"
        register={register('date', {
          required: '날짜를 입력해주세요',
          pattern: {
            value: date_reg,
            message: '날짜 사이에 - 를 포함해서 입력해주세요',
          },
        })}
      />
      <div className={styles.error_text_wrapper}>
        {errors.date && (
          <small className={styles.error_text}>{errors.date.message}</small>
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
          {...register('text', {
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

'sue client';
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
  const [uploadFiles, setUploadFiles] = useState<any>('');
  const maxLength = 100;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<useFormProps>();

  const text = watch('text', '');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <UploadInput uploadFiles={uploadFiles || []} />
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
      <HoldColorList />
      <div className={cn('textarea-container')}>
        <textarea
          className={cn('limited-textarea')}
          maxLength={maxLength}
          {...register('text', {
            maxLength: {
              value: 100,
              message: '최대 100자까지 가능합니다. ',
            },
          })}
        />
        <div className={cn('char-count')}>
          {text.length}/{maxLength}
        </div>
      </div>
      <button>답지 올리기</button>
    </form>
  );
};

export default UploadForm;

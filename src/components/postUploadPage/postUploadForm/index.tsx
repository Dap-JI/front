import classNames from 'classnames/bind';
import styles from './uploadForm.module.scss';
import VideoInput from '@/src/components/common/videoInput';
import React, { useState, useEffect } from 'react';
import HoldColorList from '../../climbListDetailPage/holdColorList';
import CommonInput from '../../common/commonInput';
import { useForm } from 'react-hook-form';
import { useFormPostUploadProps, PostDetailDataType } from '@/src/utils/type';
import {
  useDetailUploadDatas,
  usePostDetailUpdate,
} from '@/src/app/climbList/api';
import CommonButton from '../../common/commonButton';
import { useModal } from '@/src/hooks/useModal';
import ModalChoice from '@/src/components/common/moadlChoice';

const cn = classNames.bind(styles);

type PostUploadFormProps = {
  gymId: string;
  initialData?: PostDetailDataType;
};

type MediaUrlType = {
  videoUrl: string[];
  thumbnailUrl: string[];
};

const PostUploadForm = ({ gymId, initialData }: PostUploadFormProps) => {
  const [mediaUrl, setMediaUrl] = useState<MediaUrlType>({
    videoUrl: initialData?.media
      ? Array.isArray(initialData.media)
        ? initialData.media
        : [initialData.media] // 단일 문자열인 경우 배열로 변환
      : [],
    thumbnailUrl: initialData?.thumbnailUrl
      ? Array.isArray(initialData.thumbnailUrl)
        ? initialData.thumbnailUrl
        : [initialData.thumbnailUrl] // 단일 문자열인 경우 배열로 변환
      : [], // 업로드 시 썸네일은 없으므로 null로 설정
  });
  console.log(initialData);
  const [activeColor, setActiveColor] = useState<string | null>(
    initialData?.color || null,
  );
  const { showModalHandler } = useModal();

  //난이도 색
  const maxLength = 100;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<useFormPostUploadProps>({
    defaultValues: {
      ...initialData,
      media: initialData?.media
        ? Array.isArray(initialData.media)
          ? initialData.media
          : [initialData.media] // 단일 문자열인 경우 배열로 변환
        : [], // media는 항상 string[] 타입이어야 하므로 기본값을 빈 배열로 설정
    },
  });
  const text = watch('content', '');

  const { mutate: detailUploadDatas } = useDetailUploadDatas(gymId);
  const { mutate: postDetailUpdate } = usePostDetailUpdate(
    String(initialData?.post_idx),
    String(gymId),
  );
  const onSubmit = (data: useFormPostUploadProps) => {
    const formData = {
      ...data,
      media: mediaUrl.videoUrl,
      thumbnailUrl: mediaUrl.thumbnailUrl,
      color: activeColor,
      gym_idx: Number(gymId),
    };

    const confirmAction = () => {
      if (initialData) {
        postDetailUpdate(formData);
      } else {
        detailUploadDatas(formData);
      }
    };

    const message = initialData
      ? '답지를 수정 하시나요?'
      : '답지를 업로드 하시나요?';

    showModalHandler('choice', message, confirmAction);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayDate = () => {
    return formatDate(new Date());
  };

  useEffect(() => {
    if (initialData) {
      setValue('clearday', formatDate(new Date(initialData.clearday)));
      setValue('content', initialData.content);
    }
  }, [initialData, setValue]);

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
          {text?.length}/{maxLength}
        </div>
      </div>
      <CommonButton
        name={initialData ? '수정하기' : '답지 올리기'}
        type="submit"
      />
      <ModalChoice />
    </form>
  );
};

export default PostUploadForm;

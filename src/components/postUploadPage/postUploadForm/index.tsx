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
import { useVideoDelete } from '@/src/app/climbList/api';
import LoadingSpinner from '../../common/loadingSpinner';
import { Video, MediaUrl } from '@/src/utils/type';

const cn = classNames.bind(styles);

type PostUploadFormProps = {
  gymId: string;
  initialData?: PostDetailDataType;
};

const PostUploadForm = ({ gymId, initialData }: PostUploadFormProps) => {
  const [deletedVideos, setDeletedVideos] = useState<
    { videoUrl: string; thumbnailUrl: string }[]
  >([]);

  const [mediaUrl, setMediaUrl] = useState<MediaUrl>({
    videos: initialData?.media
      ? Array.isArray(initialData.media)
        ? initialData.media.map((url) => ({ s3Url: url }))
        : [{ s3Url: initialData.media }]
      : [],
    thumbnailUrl: initialData?.thumbnailUrl
      ? Array.isArray(initialData.thumbnailUrl)
        ? initialData.thumbnailUrl
        : [initialData.thumbnailUrl]
      : [],
  });
  const [activeColor, setActiveColor] = useState<string | null>(
    initialData?.color || null,
  );
  const { showModalHandler } = useModal();

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
          : [initialData.media]
        : [],
    },
  });
  const text = watch('content', '');

  const { mutate: detailUploadDatas, isPending } = useDetailUploadDatas(gymId);
  const { mutate: postDetailUpdate } = usePostDetailUpdate(
    String(initialData?.post_idx),
    String(gymId),
  );
  const { mutate: videoDelete } = useVideoDelete();

  const emptyVideos = mediaUrl.videos.length === 0;

  const onSubmit = (data: useFormPostUploadProps) => {
    if (emptyVideos) {
      showModalHandler('alert', '동영상, 등반일, 난이도 선택은 필수에요.');
      return;
    }

    // s3Url이 존재하는 동영상만 추출
    const s3VideoUrls = mediaUrl.videos
      .map((video) => video.s3Url)
      .filter((url): url is string => url !== undefined);

    if (s3VideoUrls.length !== mediaUrl.videos.length) {
      showModalHandler('alert', '동영상 업로드가 완료될 때까지 기다려주세요.');
      return;
    }

    const formData = {
      ...data,
      media: s3VideoUrls,
      thumbnailUrl: mediaUrl.thumbnailUrl,
      color: activeColor,
      gym_idx: Number(gymId),
    };

    // 동영상 삭제 처리 함수
    const handleVideoDelete = () => {
      deletedVideos.forEach(({ videoUrl, thumbnailUrl }) => {
        const videoToDelete = {
          videoUrl: videoUrl,
          thumbnailUrl: thumbnailUrl,
        };
        videoDelete(videoToDelete);
      });
    };

    const confirmAction = () => {
      if (initialData) {
        postDetailUpdate(formData);
        handleVideoDelete();
      } else {
        detailUploadDatas(formData);
        handleVideoDelete();
      }

      setDeletedVideos([]);
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

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <VideoInput
        mediaUrl={mediaUrl}
        setMediaUrl={setMediaUrl}
        setDeletedVideos={setDeletedVideos}
      />
      <CommonInput
        id="clearday"
        type="date"
        label="등반일을 선택해 주세요"
        defaultValue={getTodayDate()}
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
        type="submit"
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('limitedTextarea')}
          maxLength={maxLength}
          {...register('content')}
        />
        <div className={cn('charCount')}>
          {text?.length}/{maxLength}
        </div>
      </div>
      <CommonButton
        name={initialData ? '수정하기' : '답지 올리기'}
        type="submit"
      />
    </form>
  );
};

export default PostUploadForm;

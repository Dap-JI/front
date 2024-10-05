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
import instance from '@/src/utils/axios';

const cn = classNames.bind(styles);

type PostUploadFormProps = {
  gymId: string;
  initialData?: PostDetailDataType;
};

const PostUploadForm = ({ gymId, initialData }: PostUploadFormProps) => {
  const [deletedVideos, setDeletedVideos] = useState<
    { videoUrl: string; thumbnailUrl: string }[]
  >([]);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 새롭게 추가된 상태
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

  // 난이도 색
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

  const [isUploading, setIsUploading] = useState<boolean>(false); // 새롭게 추가된 상태
  const [progress, setProgress] = useState<number>(0); // 새롭게 추가된 상태

  const emptyVideos =
    mediaUrl.videos.length === 0 && selectedFiles.length === 0;

  // S3에 파일 업로드 함수
  const uploadToS3 = async (file: File, url: string) => {
    await instance.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setProgress((prev) => Math.max(prev, percentCompleted));
        }
      },
    });
  };

  // 서버에 업로드된 동영상의 S3 키를 전달하여 동영상 처리 요청
  const processUploadedVideos = async (
    videoKeys: string[],
    newVideosCount: number,
  ) => {
    try {
      const response = await instance.post('/api/process-uploaded-videos', {
        videoKeys,
      });

      const { videoUrls, thumbnailUrls } = response.data;
      return { videoUrls, thumbnailUrls };
    } catch (error) {
      console.error('Error processing uploaded videos', error);
      showModalHandler('alert', '동영상 처리 중 오류가 발생했습니다.');
      throw error; // 에러를 호출자에게 전달
    }
  };

  // 업로드 및 처리 프로세스를 수행하는 함수
  const handleUploadProcess = async () => {
    try {
      // 1. 사전 서명된 URL 요청
      const fileMetadata = selectedFiles.map((file) => ({
        name: file.name,
        type: file.type,
      }));

      const response = await instance.post('/api/get-upload-urls', {
        files: fileMetadata,
      });

      const { uploadUrls, videoKeys } = response.data;
      // 2. S3에 파일 업로드
      const uploadPromises = uploadUrls.map((url: string, index: number) =>
        uploadToS3(selectedFiles[index], url),
      );

      await Promise.all(uploadPromises);
      console.log('All uploads to S3 completed');

      // 3. 서버에 동영상 키 전달 및 처리 요청
      const { videoUrls: processedVideoUrls, thumbnailUrls } =
        await processUploadedVideos(videoKeys, selectedFiles.length);

      return { videoUrls: processedVideoUrls, thumbnailUrls };
    } catch (error) {
      console.error('Error uploading to S3', error);
      showModalHandler('alert', '동영상 업로드 중 오류가 발생했습니다.');
      throw error; // 에러를 호출자에게 전달
    }
  };

  // 제출 핸들러
  const onSubmit = async (data: useFormPostUploadProps) => {
    if (emptyVideos) {
      showModalHandler('alert', '동영상, 등반일, 난이도 선택은 필수에요.');
      return;
    }

    let processedVideoUrls: string[] = [];
    let processedThumbnailUrls: string[] = [];

    // 업로드가 필요한 파일이 있는 경우
    if (selectedFiles.length > 0) {
      try {
        setIsUploading(true);
        setProgress(0);

        const { videoUrls, thumbnailUrls } = await handleUploadProcess();
        processedVideoUrls = videoUrls;
        processedThumbnailUrls = thumbnailUrls;
      } catch (error) {
        console.error('Error during upload process', error);
        // 에러 핸들링은 handleUploadProcess 내에서 수행됨
        return;
      } finally {
        setIsUploading(false);
      }
    }

    // 기존 동영상 URL 추가
    const existingVideoUrls = mediaUrl.videos
      .map((video) => video.s3Url)
      .filter((url): url is string => !!url); // 타입 가드 사용
    const existingThumbnailUrls = mediaUrl.thumbnailUrl;

    // 최종 동영상 URL 및 썸네일 URL 병합
    const finalVideoUrls = [...existingVideoUrls, ...processedVideoUrls];
    const finalThumbnailUrls = [
      ...existingThumbnailUrls,
      ...processedThumbnailUrls,
    ];

    // 서버로부터 받은 URL들을 사용하여 조건 검사
    if (finalVideoUrls.length !== mediaUrl.videos.length) {
      showModalHandler('alert', '동영상 업로드가 완료될 때까지 기다려주세요.');
      return;
    }

    const formData = {
      ...data,
      media: finalVideoUrls,
      thumbnailUrl: finalThumbnailUrls,
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

    // 게시글 생성 후 동영상 삭제 처리
    if (initialData) {
      postDetailUpdate(formData);
    } else {
      detailUploadDatas(formData);
    }
    handleVideoDelete(); // 게시글 생성 후 동영상 삭제 처리

    // 삭제된 동영상 리스트 초기화
    setDeletedVideos([]);
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

  useEffect(() => {}, [mediaUrl]);
  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <VideoInput
        mediaUrl={mediaUrl}
        setMediaUrl={setMediaUrl}
        setDeletedVideos={setDeletedVideos}
        setSelectedFiles={setSelectedFiles} // 새롭게 추가된 Props
      />
      {/* 업로드 진행 상태 표시 */}
      {isUploading && (
        <div className={cn('progressWrapper')}>
          <div className={cn('linearProgressBar')}>
            <div
              className={cn('progressBar')}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={cn('progressText')}>{progress}%</span>
        </div>
      )}
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

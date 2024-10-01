'use client';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { useMutation } from '@tanstack/react-query';
import instance from '@/src/utils/axios';
import { useModal } from '@/src/hooks/useModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { CircleXIcon, PlusIcon } from '@/public/icon';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { isServerError } from '@/src/utils/axiosError';
import { Video, MediaUrl } from '@/src/utils/type';

const cn = classNames.bind(styles);

export const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    opacity: 0.5;
    padding: 0 15px;
  }

  .slick-center {
    opacity: 1 !important;
  }

  .slick-track {
    display: flex;
    justify-content: center;
  }
`;
type VideoInputProps = {
  mediaUrl: MediaUrl;
  setMediaUrl: React.Dispatch<React.SetStateAction<MediaUrl>>;
  setDeletedVideos: React.Dispatch<
    React.SetStateAction<{ videoUrl: string; thumbnailUrl: string }[]>
  >;
};

const VideoInput = ({
  mediaUrl,
  setMediaUrl,
  setDeletedVideos,
}: VideoInputProps) => {
  const { showModalHandler } = useModal();
  const [progress, setProgress] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    draggable: true,
  };

  const { mutate: videoUpload, isPending } = useMutation({
    mutationKey: ['videoFile'],
    mutationFn: async ({ formData }: { formData: FormData }) => {
      const response = await instance.post('/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(percentCompleted);
          }
        },
      });
      return response.data; // API 응답 데이터 반환
    },
    onSuccess: (data) => {
      const { videoUrls, thumbnailUrls } = data;
      setMediaUrl((prev) => {
        const updatedVideos = [...prev.videos];

        // 업로드된 동영상의 blob URL을 S3 URL로 대체
        for (let i = 0; i < videoUrls.length; i++) {
          updatedVideos[prev.videos.length - videoUrls.length + i] = {
            ...updatedVideos[prev.videos.length - videoUrls.length + i],
            s3Url: videoUrls[i],
          };
        }

        return {
          ...prev,
          videos: updatedVideos,
          thumbnailUrl: [...prev.thumbnailUrl, ...thumbnailUrls],
        };
      });
    },
    onError: (e) => {
      if (isServerError(e) && e.response && e.response.status === 401) {
        showModalHandler('alert', '답지를 1분 이하로 업로드 해주세요');
        return;
      }

      if (isServerError(e) && e.response && e.response.status === 500) {
        showModalHandler('alert', '최대 10개까지 업로드가 가능해요');
        return;
      }
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxSize = 500 * 1024 * 1024;

    if (files && files.length > 0) {
      // 현재 업로드된 동영상 개수와 새로 추가하려는 동영상 개수 확인
      if (mediaUrl.videos.length + files.length > 10) {
        showModalHandler('alert', '최대 10개까지 업로드가 가능해요.');
        return;
      }
      const formData = new FormData();
      const newVideos: Video[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          showModalHandler('alert', '영상을 500MB 이하로 업로드 해주세요');
          return;
        }
        // 동영상 파일의 객체 URL 생성
        const blobUrl = URL.createObjectURL(file);
        newVideos.push({ blobUrl });
        formData.append('videos', file);
      }

      // 미리보기를 위해 mediaUrl 상태 업데이트
      setMediaUrl((prev) => ({
        ...prev,
        videos: [...prev.videos, ...newVideos],
      }));

      // 동영상 업로드 함수 호출
      videoUpload({ formData });
    }
  };

  const handleRemoveVideo = (index: number) => {
    const videoToRemove = mediaUrl.videos[index];

    // blob URL 해제
    if (videoToRemove.blobUrl) {
      URL.revokeObjectURL(videoToRemove.blobUrl);
    }

    // 업로드된 동영상이면 삭제 요청에 추가
    if (videoToRemove.s3Url) {
      const thumbnailToRemove = mediaUrl.thumbnailUrl[index];
      setDeletedVideos((prev) => [
        ...prev,
        { videoUrl: videoToRemove.s3Url!, thumbnailUrl: thumbnailToRemove },
      ]);
    }

    // 상태에서 동영상과 썸네일 제거
    setMediaUrl((prev) => {
      const newVideos = prev.videos.filter((_, i) => i !== index);
      const newThumbnailUrl = prev.thumbnailUrl.filter((_, i) => i !== index);
      return {
        ...prev,
        videos: newVideos,
        thumbnailUrl: newThumbnailUrl,
      };
    });
  };

  // if (isPending) {
  //   return (
  //     <div style={{ width: '100px', marginTop: '10px' }}>
  //       <CircularProgressbar
  //         value={progress}
  //         text={`${progress}%`}
  //         styles={buildStyles({
  //           trailColor: '#d6d6d6',
  //         })}
  //       />
  //     </div>
  //   );
  // }

  useEffect(() => {
    return () => {
      mediaUrl.videos.forEach((video) => {
        if (video.blobUrl) {
          URL.revokeObjectURL(video.blobUrl);
        }
      });
    };
  }, [mediaUrl.videos]);

  return (
    <div className={cn('container')}>
      {mediaUrl.videos.length === 10 ? (
        <span className={cn('maxVideo')}>최대 10개까지 업로드가 가능해요</span>
      ) : (
        <>
          <label htmlFor="fileUpload">
            <PlusIcon />
          </label>
          <input
            type="file"
            id="fileUpload"
            className={cn('filetextInput')}
            multiple
            accept="video/*"
            onChange={handleFileUpload}
          />
        </>
      )}
      <div className={styles.uploadInput}>
        <div className={cn('videoWrapper')}>
          <StyledSlider {...settings}>
            {mediaUrl.videos?.map((video, index) => (
              <div key={index} className={cn('videoBox')}>
                <CircleXIcon
                  className={cn('close')}
                  onClick={() => handleRemoveVideo(index)}
                />
                <video
                  src={video.s3Url || video.blobUrl}
                  controls
                  playsInline
                  muted
                  controlsList="nodownload"
                  className={cn('video')}
                />
              </div>
            ))}
          </StyledSlider>
        </div>
      </div>
    </div>
  );
};

export default VideoInput;

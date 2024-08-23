'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { useMutation } from '@tanstack/react-query';
import instance from '@/src/utils/axios';
import ModalChoice from '../moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { CircleXIcon, PlusIcon } from '@/public/icon';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useVideoDelete } from '@/src/app/climbList/api';
import { isServerError } from '@/src/utils/axiosError';

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
  mediaUrl: {
    videoUrl: string[];
    thumbnailUrl: string[];
  };
  setMediaUrl: React.Dispatch<
    React.SetStateAction<{
      videoUrl: string[];
      thumbnailUrl: string[];
    }>
  >;
  setDeletedVideos: any;
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
    mutationFn: async (videos: FormData) => {
      const response = await instance.post('/api/videos', videos, {
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
      // 성공적으로 업로드된 경우 mediaUrl을 상태에 저장
      setMediaUrl((prev) => ({
        videoUrl: [...prev.videoUrl, ...data.videoUrls],
        thumbnailUrl: [...prev.thumbnailUrl, ...data.thumbnailUrls],
      }));
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
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > maxSize) {
          showModalHandler('alert', '영상을 500MB 이하로 업로드 해주세요');
          return;
        }

        formData.append('videos', file);
      }

      videoUpload(formData);
    }
  };
  const handleRemoveVideo = (index: number) => {
    const videoToRemove = mediaUrl.videoUrl[index];
    const thumbnailToRemove = mediaUrl.thumbnailUrl[index];

    // 삭제할 동영상과 썸네일 URL을 deletedVideos 배열에 추가
    setDeletedVideos((prev: string[]) => [
      ...prev,
      { videoUrl: videoToRemove, thumbnailUrl: thumbnailToRemove },
    ]);

    // 브라우저에서 동영상 제거
    const updatedVideos = mediaUrl.videoUrl.filter((_, i) => i !== index);
    const updatedThumbnailUrl = mediaUrl.thumbnailUrl.filter(
      (_, i) => i !== index,
    );

    setMediaUrl({
      videoUrl: updatedVideos,
      thumbnailUrl: updatedThumbnailUrl,
    });
  };

  if (isPending) {
    return (
      <div style={{ width: '100px', marginTop: '10px' }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            trailColor: '#d6d6d6',
          })}
        />
      </div>
    );
  }

  return (
    <div className={cn('container')}>
      {mediaUrl.videoUrl.length === 10 ? (
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
            {mediaUrl.videoUrl?.map((url, index) => (
              <div key={index} className={cn('videoBox')}>
                <CircleXIcon
                  className={cn('close')}
                  onClick={() => handleRemoveVideo(index)}
                />
                <video
                  src={url}
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
      <ModalChoice />
    </div>
  );
};

export default VideoInput;

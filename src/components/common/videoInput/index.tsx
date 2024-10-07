import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { useModal } from '@/src/hooks/useModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { CircleXIcon, PlusIcon } from '@/public/icon';
import { Video, MediaUrl } from '@/src/utils/type';
import instance from '@/src/utils/axios';

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
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>; // 새롭게 추가된 Props
};

const VideoInput = ({
  mediaUrl,
  setMediaUrl,
  setDeletedVideos,
  setSelectedFiles, // 새롭게 추가된 Props
}: VideoInputProps) => {
  const { showModalHandler } = useModal();

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

  // 동영상 파일의 재생 시간을 반환하는 함수
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.onerror = () => {
        reject(new Error('Cannot load video'));
      };
    });
  };

  // 파일 업로드 핸들러 (검증만 수행)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (files && files.length > 0) {
      const validFiles: File[] = [];
      let hasLongVideo = false;
      let hasLargeFile = false;

      // 모든 파일의 크기와 재생 시간을 검증
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 파일 크기 검증
        if (file.size > maxSize) {
          hasLargeFile = true;
          continue;
        }

        try {
          const duration = await getVideoDuration(file);
          if (duration > 60) {
            hasLongVideo = true;
            continue;
          }
          validFiles.push(file);
        } catch (error) {
          console.error('Error reading video duration', error);
          showModalHandler('alert', '동영상 파일을 처리할 수 없습니다.');
          return;
        }
      }

      // 하나라도 1분 초과 동영상이 있으면 전체 업로드 중단
      if (hasLongVideo) {
        showModalHandler('alert', '1분 미만의 동영상만 업로드가 가능합니다.');
        return;
      }

      // 하나라도 크기가 큰 파일이 있으면 전체 업로드 중단
      if (hasLargeFile) {
        showModalHandler('alert', '영상을 500MB 이하로 업로드 해주세요.');
        return;
      }

      // 유효한 파일이 없는 경우 함수 종료
      if (validFiles.length === 0) {
        return;
      }

      // 유효한 파일을 미리보기용 상태에 추가
      const newVideos: Video[] = validFiles.map((file) => ({
        blobUrl: URL.createObjectURL(file),
      }));

      setMediaUrl((prev) => ({
        ...prev,
        videos: [...prev.videos, ...newVideos],
      }));

      // 선택된 파일을 부모 컴포넌트로 전달
      setSelectedFiles((prev) => [...prev, ...validFiles]);
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

  // 컴포넌트 언마운트 시 모든 blob URL 해제
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

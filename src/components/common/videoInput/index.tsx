'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoInput.module.scss';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '@/src/components/common/loadingSpinner';
import instance from '@/src/utils/axios';
import ModalChoice from '../moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { CircleXIcon } from '@/public/icon';

const cn = classNames.bind(styles);

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
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
    thumbnailUrl: string | null;
  };
  setMediaUrl: React.Dispatch<
    React.SetStateAction<{
      videoUrl: string[];
      thumbnailUrl: null;
    }>
  >;
};

const VideoInput = ({ mediaUrl, setMediaUrl }: VideoInputProps) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const { showModalHandler } = useModal();

  const { mutate: videoUpload, isPending } = useMutation({
    mutationKey: ['videoFile'],
    mutationFn: async (videos: FormData) => {
      const response = await instance.post('/api/videos', videos, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // API 응답 데이터 반환
    },
    onSuccess: (data) => {
      // 성공적으로 업로드된 경우 mediaUrl을 상태에 저장
      setMediaUrl({
        videoUrl: data.videoUrls,
        thumbnailUrl: data.thumbnailUrl,
      });
      setFileUploaded(true);
    },
    onError: (error) => {
      showModalHandler('alert', '영상을 1분 이하로 업로드 해주세요');
      console.error('파일 업로드 실패:', error);
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxSize = 500 * 1024 * 1024;

    if (files && files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`파일 크기: ${file.size}, 최대 허용 크기: ${maxSize}`);

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
    const updatedVideos = mediaUrl.videoUrl.filter((_, i) => i !== index);
    setMediaUrl({
      videoUrl: updatedVideos,
      thumbnailUrl: null,
    });
    if (updatedVideos.length === 0) {
      setFileUploaded(false);
    }
  };

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

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <label htmlFor="fileUpload">업로드</label>
      <input
        type="file"
        id="fileUpload"
        className={cn('filetextInput')}
        multiple
        accept="video/*"
        onChange={handleFileUpload}
      />
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

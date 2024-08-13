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

const cn = classNames.bind(styles);

const StyledSlider = styled(Slider)`
  .slick-slide {
  }

   .slick-list {
   }

  .slick-track {
]  }

  .slick-dots {
    bottom: -25px;
    padding: 10px;
  }

  .slick-dots li button:before {
  }

  .slick-dots li.slick-active button:before {
  }
`;

const VideoWrapper = styled.div`
  margin: auto;

  .slick-list {
    width: 100%;
  }
`;

const VideoElement = styled.video`
  width: 250px;
  // margin: auto;
  borderradious: 10px;
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
  //동영상 url받는 함수

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
  //동영상 업로드 해서 url받기
  const handleCancel = () => {
    setMediaUrl({
      videoUrl: [],
      thumbnailUrl: null,
    });
    setFileUploaded(false);
  };
  //취소 버튼

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // 한 번에 3개의 슬라이드를 표시
    slidesToScroll: 1,
    arrows: false,
    centerPadding: '20px',
    draggable: true,
    centerMode: true,
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <label onClick={handleCancel}>삭제</label>
      <>
        <label htmlFor="fileUpload">업로드</label>
        <input
          type="file"
          id="fileUpload"
          className={cn('filetextInput')}
          multiple
          accept="video/*"
          onChange={handleFileUpload}
        />
      </>
      <div className={styles.uploadInput}>
        <VideoWrapper>
          <StyledSlider {...settings}>
            {mediaUrl.videoUrl?.map((url, index) => (
              <div>
                <VideoElement
                  key={index}
                  src={url}
                  controls
                  playsInline
                  muted
                  controlsList="nodownload"
                />
              </div>
            ))}
          </StyledSlider>
        </VideoWrapper>
      </div>
      <ModalChoice />
    </div>
  );
};

export default VideoInput;

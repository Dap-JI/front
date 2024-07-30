'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './uploadInput.module.scss';
import { useMutation } from '@tanstack/react-query';
import axios from '@/src/utils/axios';
import LoadingSpinner from '@/src/components/loadingSpinner';

const cn = classNames.bind(styles);

type UploadInputProps = {
  uploadFiles: any;
};

const UploadInput = ({ uploadFiles }: UploadInputProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { mutate: videoUpload, isPending } = useMutation({
    mutationKey: ['videoFile'],
    mutationFn: async (video: FormData) => {
      const response = await axios.post('/api/videos', video, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // API 응답 데이터 반환
    },
    onSuccess: (data) => {
      // 성공적으로 업로드된 경우 videoUrl을 상태에 저장
      setVideoUrl(data.videoUrl);
      setFileUploaded(true);
    },
    onError: (error) => {
      console.error('파일 업로드 실패:', error);
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('video', files[0]); // 첫 번째 파일을 'video' 키로 추가
      videoUpload(formData); // FormData를 mutate 함수에 전달
    }
  };

  const handleCancel = () => {
    setVideoUrl(null);
    setFileUploaded(false);
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      {videoUrl ? (
        <label onClick={handleCancel}>삭제</label>
      ) : (
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
      )}
      <div className={styles.uploadInput}>
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            playsInline
            muted
            className={cn('videoPreview')}
          />
        )}
      </div>
    </div>
  );
};

export default UploadInput;

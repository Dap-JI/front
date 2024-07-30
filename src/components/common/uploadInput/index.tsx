'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './uploadInput.module.scss';

const cn = classNames.bind(styles);

const UploadInput = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const file = files[0]; // 여러 파일을 선택할 수 있지만, 첫 번째 파일만 사용
      const formData = new FormData();
      formData.append('uploadFiles', file);

      // 동영상 미리보기
      const url = URL.createObjectURL(file);
      setVideoUrl(url);

      // 서버에 파일 업로드
      uploadFile(formData);
    }
  };

  // 서버에 파일 업로드를 처리하는 함수
  const uploadFile = (formData: FormData) => {
    // 파일 업로드 로직을 구현하세요
    console.log('파일 업로드 준비:', formData);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('labelWrapper')}>
        <label htmlFor="fileUpload">파일 업로드</label>
        <input
          type="file"
          id="fileUpload"
          className={cn('filetextInput')}
          multiple
          accept="video/*"
          onChange={handleFileUpload}
        />
      </div>
      <div className={styles.uploadInput}>
        {videoUrl && (
          <video
            src={videoUrl}
            controls
            className={cn('videoPreview')}
            width="100%"
            height="auto"
          />
        )}
      </div>
    </div>
  );
};

export default UploadInput;

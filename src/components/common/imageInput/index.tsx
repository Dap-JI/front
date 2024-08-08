'use client';
import classNames from 'classnames/bind';
import styles from './imageInput.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { ProfileAddIcon } from '@/public/icon';
import { useMutation } from '@tanstack/react-query';
import instance from '@/src/utils/axios';
import LoadingSpinner from '../loadingSpinner';

const cn = classNames.bind(styles);

type ImageInputProps = {
  fileUrl: any;
  setFileUrl: any;
  foldername: string;
};

const ImageInput = ({ fileUrl, setFileUrl, foldername }: ImageInputProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate: imageUpload, isPending } = useMutation({
    mutationKey: ['profileImageUpload'],
    mutationFn: async (image: FormData) => {
      const res = await instance.post(`/api/images/${foldername}`, image);
      return res.data;
    },
    onSuccess: (data) => {
      setFileUrl(data.imageUrl);
    },
    onError: (error) => {
      console.error('파일 업로드 실패:', error);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!fileExtension || !validExtensions.includes(fileExtension)) {
        setError('지원하지 않는 파일 형식입니다.');
        return;
      }

      setSelectedFile(file); // 선택된 파일 상태 업데이트
      setError(null);
      // 미리보기 URL을 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result); // 미리보기 URL을 상태에 저장
      };
      reader.readAsDataURL(file);

      // 파일을 FormData로 감싸서 업로드
      const formData = new FormData();
      formData.append('image', file);
      imageUpload(formData); // 파일 업로드 요청
    }
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className={cn('container')}>
      <label htmlFor="imageUpload">
        {fileUrl ? (
          <Image
            src={fileUrl as string}
            alt="Preview"
            width={150}
            height={150}
            priority={true}
            className={cn('previewImage')}
          />
        ) : (
          ''
        )}
        <ProfileAddIcon className={cn('ProfileChange')} />
      </label>
      <input
        type="file"
        id="imageUpload"
        className={cn('fileInput')}
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png" // 이미지 파일만 허용
      />
      {error && <p className={cn('error')}>{error}</p>}
    </div>
  );
};

export default ImageInput;

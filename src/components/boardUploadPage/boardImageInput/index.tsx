import { useState } from 'react';
import styles from './boardImageInput.module.scss';
import classNames from 'classnames/bind';
import { CircleXIcon, PlusIcon } from '@/public/icon';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import instance from '@/src/utils/axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { isServerError } from '@/src/utils/axiosError';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

type BoardImageInputProps = {
  fileUrl: string[];
  setFileUrl: React.Dispatch<React.SetStateAction<string[]>>;
  setDeleteUrl: React.Dispatch<React.SetStateAction<string[]>>;
};

const BoardImageInput = ({
  fileUrl,
  setFileUrl,
  setDeleteUrl,
}: BoardImageInputProps) => {
  const [progress, setProgress] = useState(0);
  const { showModalHandler } = useModal();
  const { mutate: boardImageUpload, isPending } = useMutation({
    mutationKey: ['boardImageUpload'],
    mutationFn: async (image: FormData) => {
      const res = await instance.post(`/api/images/board-image`, image, {
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
      return res.data;
    },
    onSuccess: (data) => {
      // 서버에서 받은 최종 URL을 미리보기 URL과 대체
      setFileUrl((prev: string[]) => [...prev, ...data.imageUrls]);
    },
    onError: (e) => {
      if (isServerError(e) && e.response && e.response.status === 400) {
        showModalHandler('alert', '최대 3개까지 업로드가 가능해요');
      }
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 현재 파일 URL 개수와 새로 업로드할 파일 개수를 합산하여 3개 초과 여부 확인
      if (fileUrl.length + files.length > 3) {
        showModalHandler('alert', '최대 3개까지 업로드가 가능해요');
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('image', file); // 각 파일을 FormData에 추가
      });

      // 서버로 파일 업로드 요청
      boardImageUpload(formData);
    }
  };

  const handleRemoveImage = (index: number) => {
    setDeleteUrl((prev: string[]) => [...prev, fileUrl[index]]);
    setFileUrl((prev: string[]) => prev.filter((_, i) => i !== index));
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
      {fileUrl.length === 3 ? (
        <span className={cn('maxImage')}>최대 3개까지 업로드가 가능해요</span>
      ) : (
        <>
          <label htmlFor="boardImageFile" className={cn('boardUploadLabel')}>
            <PlusIcon />
          </label>
          <input
            type="file"
            id="boardImageFile"
            multiple
            accept="image/*"
            className={cn('boardImageInput')}
            onChange={handleFileUpload}
          />
        </>
      )}

      <div className={styles.uploadInput}>
        {fileUrl?.map((url: string, index: number) => (
          <div key={index} className={cn('imageBox')}>
            <CircleXIcon
              className={cn('close')}
              onClick={() => handleRemoveImage(index)}
            />
            <Image
              src={url}
              width="50"
              height="50"
              alt="게시물 이미지"
              className={cn('boardImage')}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardImageInput;

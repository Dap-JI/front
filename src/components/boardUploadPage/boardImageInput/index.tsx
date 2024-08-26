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
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 미리보기 상태 추가
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
      //서버에서 받은 url
      setPreviewUrls((prev) =>
        prev.map((url, index) => data.imageUrls[index] || url),
      );
    },
    onError: (e) => {
      if (isServerError(e) && e.response && e.response.status === 500) {
        showModalHandler('alert', '최대 3개까지 업로드가 가능해요');
      }
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            // 새로운 미리보기 URL을 상태에 추가
            setPreviewUrls((prev: string[]) => [
              ...prev,
              reader.result as string,
            ]);
          }
        };
        reader.readAsDataURL(file); // 파일을 base64로 인코딩
        const formData = new FormData(); // 폼데이터 객체 생성
        formData.append('image', file); // 폼데이터 객체에 키, 값을 추가
        boardImageUpload(formData); // mutate에 넣어서 전송
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setDeleteUrl((prev: string[]) => [...prev, fileUrl[index]]);
    setFileUrl((prev: string[]) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev: string[]) => prev.filter((_, i) => i !== index)); // 미리보기에서도 삭제
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
        {previewUrls?.map((url: string, index: number) => (
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

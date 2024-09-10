'use client';
import styles from './noticeuUploadForm.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import ModalChoice from '@/src/components/common/moadlChoice';
import { fetchNoticeUpload, fetchNoticeUpdate } from '@/src/app/admin/api';
import { useMutation } from '@tanstack/react-query';
import { useFormNoticeUploadType } from '@/src/utils/type';
import { useModal } from '@/src/hooks/useModal';
import { useRouter } from 'next/navigation';
import { noticeDataType } from '@/src/utils/type';
import { useEffect } from 'react';

const cn = classNames.bind(styles);

type NoticeuUploadFormProps = {
  params: {
    gymId: string;
    noticeId?: string;
  };
  initialData?: noticeDataType;
};

const NoticeuUploadForm = ({ params, initialData }: NoticeuUploadFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<useFormNoticeUploadType>();
  const { gymId, noticeId } = params;

  const { showModalHandler } = useModal();

  const router = useRouter();

  //공지 업로드
  const { mutate: noticUpload } = useMutation({
    mutationKey: ['noticUpload', gymId],
    mutationFn: (formData: useFormNoticeUploadType) =>
      fetchNoticeUpload(formData, gymId),
    onSuccess: () => {
      router.push(`/admin/list`);
    },
    onError: () => {
      showModalHandler('alert', '공지 업로드 실패');
    },
  });

  //공지 수정
  const { mutate: noticUpdate } = useMutation({
    mutationKey: ['noticUpdate', gymId, noticeId],
    mutationFn: (formData: useFormNoticeUploadType) =>
      fetchNoticeUpdate(formData, gymId, noticeId),
    onSuccess: () => {
      router.push(`/climbList/${gymId}/notice/${noticeId}`);
    },
    onError: () => {
      showModalHandler('alert', '공지 수정 실패');
    },
  });

  const onSubmit = (data: useFormNoticeUploadType) => {
    const formData = {
      ...data,
    };
    const confirmAction = () => {
      if (initialData) {
        noticUpdate(formData);
        return;
      }
      noticUpload(formData);
    };
    const message = initialData
      ? '공지를 수정 하시나요?'
      : '공지 업로드 하시나요?';
    showModalHandler('choice', message, confirmAction);
  };

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('content', initialData.content);
    }
  }, [initialData]);

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('titleContainer')}>
        <CommonInput
          placeholder="제목을 입력해 주세요"
          id="title"
          type="string"
          register={register('title', {
            required: '제목을 입력해 주세요',
          })}
        />
      </div>
      {errors.title && (
        <small className={styles.error_text}>
          {errors.title.message as string}
        </small>
      )}

      <div className={cn('textareaContainer')}>
        <textarea
          className={cn('textArea')}
          {...register('content', {
            required: '내용을 입력해 주세요',
          })}
        />
      </div>
      {errors.content && (
        <small className={styles.error_text}>
          {errors.content.message as string}
        </small>
      )}

      <CommonButton name="업로드 " type="submit" />
      <ModalChoice />
    </form>
  );
};

export default NoticeuUploadForm;

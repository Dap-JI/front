'use client';
import styles from './noticeuUploadForm.module.scss';
import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
import CommonInput from '@/src/components/common/commonInput';
import CommonButton from '@/src/components/common/commonButton';
import ModalChoice from '@/src/components/common/moadlChoice';
import { fetchNoticeUpload } from '@/src/app/admin/api';
import { useMutation } from '@tanstack/react-query';
import { useFormNoticeUploadType } from '@/src/utils/type';
import { useModal } from '@/src/hooks/useModal';
import { useRouter } from 'next/navigation';

const cn = classNames.bind(styles);

type NoticeuUploadFormProps = {
  params: {
    gymId: string;
  };
};

const NoticeuUploadForm = ({ params }: NoticeuUploadFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<useFormNoticeUploadType>();
  const { gymId } = params;
  const { showModalHandler } = useModal();
  const router = useRouter();

  const { mutate: noticUpload } = useMutation({
    mutationKey: ['noticUpload'],
    mutationFn: (formData: useFormNoticeUploadType) =>
      fetchNoticeUpload(formData, gymId),
    onSuccess: () => {
      router.push(`/admin/list`);
    },
    onError: () => {
      showModalHandler('alert', '공지 업로드 실패');
    },
  });

  const onSubmit = (data: useFormNoticeUploadType) => {  
    const formData = {
      ...data,
    };
    const confirmAction = () => {
      noticUpload(formData);
    };
    showModalHandler('choice', '공지 업로드 하시나요?', confirmAction);
  };
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

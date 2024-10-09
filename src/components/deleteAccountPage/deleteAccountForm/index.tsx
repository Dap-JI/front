'use client';
import React from 'react';
import styles from './deleteAccountForm.module.scss';
import classNames from 'classnames/bind';
import { fetchDeleteAccount } from '@/src/app/deleteAccount/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useModal } from '@/src/hooks/useModal';

const cn = classNames.bind(styles);

const DeleteAccountForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const maxLength = '200';
  const text = watch('deleteReason', '');
  const isAgreed = watch('agreeCheck');
  const { showModalHandler } = useModal();

  const { mutate: deleteAccount } = useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: () => fetchDeleteAccount(),
    onSuccess: () => {
      router.replace(`/`);
    },
    onError: () => {
      console.log('에러');
    },
  });

  const onSubmit = (data: any) => {
    const confirmAction = () => {
      deleteAccount();
    };

    showModalHandler('choice', '정말 계정을 삭제하시나요?', confirmAction);
  };

  return (
    <form className={cn('container')} onSubmit={handleSubmit(onSubmit)}>
      <h3>✅ 답지를 떠나시는 이유를 알려주세요</h3>
      <div className={cn('reasonCheck')}>
        <label>
          <input type="checkbox" {...register('nothing')} />
          별다른 이유 없어요
        </label>

        <label>
          <input type="checkbox" {...register('contentLacking')} />
          콘텐츠가 부족해요
        </label>

        <label>
          <input type="checkbox" {...register('slowUpload')} />
          동영상 업로드 속도가 느려요
        </label>

        <label>
          <input type="checkbox" {...register('unstableService')} />
          서비스가 불안정해요
        </label>

        <label>
          <input type="checkbox" {...register('newAccount')} />새 계정을 만들고
          싶어요
        </label>

        <label>
          <input type="checkbox" value="notUsing" {...register('notUsing')} />잘
          사용하지 않아요
        </label>

        <label>
          <input
            type="checkbox"
            value="designIssue"
            {...register('designIssue')}
          />
          디자인이 마음에 안들어요
        </label>
      </div>

      <h3>✏️ 구체적인 이유가 있다면 알려주세요</h3>
      <div className={cn('deleteReasonWrapper')}>
        <textarea {...register('deleteReason')} maxLength={200} />
        <small>
          {text.length}/{maxLength}
        </small>
      </div>
      <label htmlFor="agreeCheck" className={cn('agreeCheck')}>
        <input
          type="checkbox"
          id="agreeCheck"
          {...register('agreeCheck', {
            required: '안내사항에 동의해 주세요',
          })}
        />
        <span>안내사항을 모두 확인했으며 동의했습니다.</span>
        {errors.agreeCheck && (
          <small className={cn('agreeCheckError')}>
            {errors.agreeCheck.message as string}
          </small>
        )}
      </label>
      <button
        className={cn('deleteAccointBtn')}
        disabled={!isAgreed}
        type="submit"
      >
        삭제하기
      </button>
    </form>
  );
};

export default DeleteAccountForm;

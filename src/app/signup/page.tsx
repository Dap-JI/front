'use client';

import classNames from 'classnames/bind';
import styles from './signupPage.module.scss';
import CommonButton from '@/src/components/common/commonButton';
import CommonInput from '@/src/components/common/commonInput';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ModalChoice from '@/src/components/common/moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import { fetchSignUp, fetchSignUpType } from './api';
import { useMutation } from '@tanstack/react-query';
import { isServerError } from '@/src/utils/axiosError';

const cn = classNames.bind(styles);

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fetchSignUpType>();
  const router = useRouter();
  const { showModalHandler } = useModal();

  const { mutate: userSignUp } = useMutation({
    mutationKey: ['userSignUp'],
    mutationFn: (formData: fetchSignUpType) => fetchSignUp(formData),
    onSuccess: () => {
      showModalHandler('alert', '회원가입이 되었습니다. ');
      router.replace('/signin');
    },
    onError: (e) => {
      if (isServerError(e) && e.response && e.response.status === 400) {
        showModalHandler('alert', '이메일이 중복되었어요');
        return;
      }

      if (isServerError(e) && e.response && e.response.status === 500) {
        showModalHandler('alert', '관리자에게 문의해 주세요');
        return;
      }
    },
  });

  const onSubmit = (data: fetchSignUpType) => {
    const formData = {
      ...data,
    };
    userSignUp(formData);
  };
  return (
    <div className={cn('container')}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cn('signUpForm')}>
        <CommonInput
          placeholder="email"
          type="email"
          register={register('email', {
            required: '이메일 꼭 필요함',
          })}
        />
        {errors.email && <span>{errors.email.message as string}</span>}
        <CommonInput
          placeholder="password"
          register={register('password', {
            required: '비밀번호 꼭 필요함',
          })}
        />
        {errors.password && <span>{errors.password.message as string}</span>}
        <CommonButton name="회원가입" type="submit" />
      </form>
      <span onClick={() => router.replace(`/signin`)}>로그인 ㄱㄱ</span>
      <ModalChoice />
    </div>
  );
};

export default SignUpPage;

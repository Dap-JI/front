'use client';

import styles from './signinPage.module.scss';
import classNames from 'classnames/bind';
import CommonButton from '@/src/components/common/commonButton';
import CommonInput from '@/src/components/common/commonInput';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ModalChoice from '@/src/components/common/moadlChoice';
import { useModal } from '@/src/hooks/useModal';
import { fetchSignIn, fetchSignInType } from './api';
import { useMutation } from '@tanstack/react-query';
import { isServerError } from '@/src/utils/axiosError';

const cn = classNames.bind(styles);

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fetchSignInType>();
  const router = useRouter();
  const { showModalHandler } = useModal();

  const { mutate: userSignIn } = useMutation({
    mutationKey: ['userSignIn'],
    mutationFn: (formData: fetchSignInType) => fetchSignIn(formData),
    onSuccess: (data: any) => {
      if (data.user.nickname === null) {
        router.push('/join');
        return;
      }
      router.push(`/auth/dapji`);
    },
    onError: (e) => {
      if (isServerError(e) && e.response && e.response.status === 401) {
        showModalHandler('alert', '이메일이나 비밀번호가 잘못되었습니다');
        return;
      }

      if (isServerError(e) && e.response && e.response.status === 500) {
        showModalHandler('alert', '서버에러');
        return;
      }
    },
  });

  const onSubmit = (data: fetchSignInType) => {
    const formData = {
      ...data,
    };
    userSignIn(formData);
  };

  return (
    <div className={cn('container')}>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={cn('signInForm')}>
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
          type="password"
          register={register('password', {
            required: '비밀번호 꼭 필요함',
          })}
        />
        {errors.password && <span>{errors.password.message as string}</span>}
        <CommonButton name="로그인" type="submit" />
      </form>
      <span onClick={() => router.push(`/signup`)}>회원가입 ㄱㄱ</span>
      <span onClick={() => router.push(`/`)}>소셜로그인 ㄱㄱ</span>
      <ModalChoice />
    </div>
  );
};

export default SignInPage;

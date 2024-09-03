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
      router.push('signin');
    },
    onError: () => {
      showModalHandler('alert', '회원가입 에러');
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
      <span onClick={() => router.push(`/signin`)}>로그인 ㄱㄱ</span>
      <ModalChoice />
    </div>
  );
};

export default SignUpPage;
